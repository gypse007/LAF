import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 150;

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return [positions, velocities];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positionArray[i3] += velocities[i3];
      positionArray[i3 + 1] += velocities[i3 + 1];
      positionArray[i3 + 2] += velocities[i3 + 2];

      // Boundary check
      if (Math.abs(positionArray[i3]) > 10) velocities[i3] *= -1;
      if (Math.abs(positionArray[i3 + 1]) > 10) velocities[i3 + 1] *= -1;
      if (Math.abs(positionArray[i3 + 2]) > 5) velocities[i3 + 2] *= -1;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#C9A962"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo(() => {
    return [
      { position: [5, 3, -5], scale: 2, color: '#C9A962' },
      { position: [-6, -2, -3], scale: 1.5, color: '#E8D5A3' },
      { position: [3, -4, -7], scale: 1, color: '#9A7B3D' },
      { position: [-4, 4, -6], scale: 1.2, color: '#C9A962' },
    ];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, index) => {
      const time = state.clock.elapsedTime;
      child.position.y += Math.sin(time + index) * 0.002;
      child.rotation.x = time * 0.1 * (index % 2 === 0 ? 1 : -1);
      child.rotation.y = time * 0.05 * (index % 2 === 0 ? -1 : 1);
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, index) => (
        <mesh key={index} position={orb.position as [number, number, number]}>
          <sphereGeometry args={[orb.scale, 32, 32]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
