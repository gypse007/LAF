import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────
// VERTEX SHADER — Wall displacement around cursor
// ─────────────────────────────────────────────────────────────
const vertexShader = `
  varying vec2 vUv;
  varying float vRipple;

  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uProgress;

  // Simplex noise for organic surface
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 newPosition = position;

    // Cursor distance
    float dist = distance(uv, uPointer);

    // Radial displacement falloff
    float ripple = smoothstep(0.45, 0.0, dist);
    float wideRipple = smoothstep(0.7, 0.0, dist) * 0.25;
    float cursorDisp = (ripple + wideRipple) * uProgress;

    // Ambient surface breathing
    float breath = snoise(uv * 3.0 + uTime * 0.12) * 0.008;

    newPosition.z += cursorDisp * 0.1 + breath;
    vRipple = cursorDisp;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// ─────────────────────────────────────────────────────────────
// FRAGMENT SHADER — Grayscale → Full Color reveal around cursor
// The video plays desaturated. Where cursor is, color blooms.
// ─────────────────────────────────────────────────────────────
const fragmentShader = `
  varying vec2 vUv;
  varying float vRipple;

  uniform sampler2D uVideoTexture;
  uniform vec2 uPointer;
  uniform float uProgress;
  uniform float uTime;

  void main() {
    // Sample video texture
    vec4 texColor = texture2D(uVideoTexture, vUv);

    // Grayscale conversion (luminance-preserving)
    float gray = dot(texColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec3 grayscaleColor = vec3(gray);

    // Slightly brighten the grayscale to feel like a white wall
    grayscaleColor = mix(grayscaleColor, vec3(1.0), 0.35);

    // ── Color reveal mask ──
    float dist = distance(vUv, uPointer);

    // Soft feathered radial reveal (80-120px equivalent in UV space)
    float revealRadius = 0.25 * uProgress;
    float feather = 0.12;
    float colorMask = 1.0 - smoothstep(revealRadius - feather, revealRadius + feather, dist);

    // Scale up the "after" layer slightly for dimensional feel (1.02x)
    vec2 afterUv = (vUv - 0.5) * (1.0 - colorMask * 0.02) + 0.5;
    vec4 colorTexColor = texture2D(uVideoTexture, afterUv);

    // Boost saturation slightly in the revealed area
    vec3 revealedColor = colorTexColor.rgb;
    float revealGray = dot(revealedColor, vec3(0.2126, 0.7152, 0.0722));
    revealedColor = mix(vec3(revealGray), revealedColor, 1.15); // 15% saturation boost

    // Blend grayscale → color based on cursor proximity
    vec3 finalColor = mix(grayscaleColor, revealedColor, colorMask);

    // ── Embossed shadow from displacement ──
    float shadow = smoothstep(0.0, 0.5, vRipple) * 0.15;
    finalColor -= shadow * 0.5;

    // ── Edge glow at reveal boundary ──
    float edgeGlow = smoothstep(revealRadius - feather * 0.5, revealRadius, dist)
                   * (1.0 - smoothstep(revealRadius, revealRadius + feather * 0.5, dist));
    finalColor += edgeGlow * vec3(0.788, 0.663, 0.384) * 0.15 * uProgress; // Gold edge

    // ── Subtle vignette ──
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(vUv - 0.5));
    finalColor *= 0.95 + vignette * 0.05;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ─────────────────────────────────────────────────────────────
// VIDEO WALL MESH — Interactive color reveal surface
// ─────────────────────────────────────────────────────────────
function VideoWall() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const isHovering = useRef(false);
  const progressRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);

  // Create video element and texture
  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/videos/hero-bg.mp4';
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.play().catch(() => {
      // Autoplay blocked — will start on interaction
      const startPlay = () => {
        video.play();
        window.removeEventListener('click', startPlay);
        window.removeEventListener('touchstart', startPlay);
      };
      window.addEventListener('click', startPlay);
      window.addEventListener('touchstart', startPlay);
    });

    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
    texture.colorSpace = THREE.SRGBColorSpace;

    videoRef.current = video;
    setVideoTexture(texture);

    return () => {
      video.pause();
      video.src = '';
      texture.dispose();
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uProgress: { value: 0 },
      uVideoTexture: { value: null as THREE.VideoTexture | null },
    }),
    []
  );

  // Update texture uniform when ready
  useEffect(() => {
    if (videoTexture) {
      uniforms.uVideoTexture.value = videoTexture;
    }
  }, [videoTexture, uniforms]);

  // Pointer tracking
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - (e.clientY / window.innerHeight);
      isHovering.current = true;
    };
    const onMouseLeave = () => { isHovering.current = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX / window.innerWidth;
        mouse.current.y = 1.0 - (e.touches[0].clientY / window.innerHeight);
        isHovering.current = true;
      }
    };
    const onTouchEnd = () => { isHovering.current = false; };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;

    mat.uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth pointer follow
    mat.uniforms.uPointer.value.lerp(mouse.current, 0.06);

    // Progress: ramp up on hover, down on leave
    const target = isHovering.current ? 1.0 : 0.0;
    progressRef.current += (target - progressRef.current) * 0.04;
    mat.uniforms.uProgress.value = progressRef.current;

    // Micro-tilt
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      (mouse.current.y - 0.5) * 0.04,
      0.03
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      (mouse.current.x - 0.5) * -0.04,
      0.03
    );
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);
  const subdivisions = isMobile ? 128 : 256;

  if (!videoTexture) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width * 1.15, viewport.height * 1.15, subdivisions, subdivisions]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────
// AMBIENT AUDIO — Dimensional breeze on first interaction
// ─────────────────────────────────────────────────────────────
function useAmbientBreeze() {
  const hasPlayed = useRef(false);

  const playBreeze = useCallback(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    const ctx = new AudioContext();

    const buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
    src.stop(ctx.currentTime + 0.8);

    src.onended = () => ctx.close();
    setTimeout(() => { hasPlayed.current = false; }, 3000);
  }, []);

  useEffect(() => {
    const handler = () => playBreeze();
    window.addEventListener('mousemove', handler, { once: true });
    window.addEventListener('touchstart', handler, { once: true });
    return () => {
      window.removeEventListener('mousemove', handler);
      window.removeEventListener('touchstart', handler);
    };
  }, [playBreeze]);
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export default function HeroScene() {
  useAmbientBreeze();

  return (
    <div className="absolute inset-0 z-0 bg-[#F6F7F8]">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <VideoWall />
      </Canvas>
    </div>
  );
}
