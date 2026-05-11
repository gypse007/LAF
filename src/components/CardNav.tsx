import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';

type CardNavLink = {
    label: string;
    href: string;
    ariaLabel: string;
};

export type CardNavItem = {
    label: string;
    bgColor: string;
    textColor: string;
    links: CardNavLink[];
};

export interface CardNavProps {
    logo: string;
    logoAlt?: string;
    items: CardNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    onCTAClick?: () => void;
}

const CardNav: React.FC<CardNavProps> = ({
    logo,
    logoAlt = 'Logo',
    items,
    className = '',
    ease = 'power3.out',
    menuColor,
    buttonBgColor,
    buttonTextColor,
    onCTAClick,
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';
                contentEl.offsetHeight;

                const topBar = 60;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });
        tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
        tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;
        return () => { tl?.kill(); tlRef.current = null; };
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;
            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) { newTl.progress(1); tlRef.current = newTl; }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) tlRef.current = newTl;
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.getElementById(href.slice(1));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            if (isExpanded) toggleMenu();
        }
    };

    return (
        <div className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[820px] z-[99] top-[1.2em] md:top-[1.5em] ${className}`}>
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 relative will-change-[height]`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    borderRadius: '20px',
                    /* Desktop: glass → white on hover. Mobile: always semi-opaque white */
                    background: isHovered
                        ? 'rgba(255, 255, 255, 0.95)'
                        : 'rgba(255, 255, 255, 0.55)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    boxShadow: '0 4px 36px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.55)',
                    overflow: 'hidden',
                    transition: 'background 0.3s ease',
                }}
            >
                {/* Top bar */}
                <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 z-[2]">
                    {/* Hamburger */}
                    <div
                        className={`hamburger-menu group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        tabIndex={0}
                        style={{ color: menuColor || '#1a1409' }}
                    >
                        <div className={`w-[26px] h-[2px] bg-current transition-[transform,opacity] duration-300 origin-center ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''} group-hover:opacity-60`} />
                        <div className={`w-[26px] h-[2px] bg-current transition-[transform,opacity] duration-300 origin-center ${isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''} group-hover:opacity-60`} />
                    </div>

                    {/* Logo — 160px, overflows the nav bar intentionally for impact */}
                    <div className="flex items-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 order-1 md:order-none pointer-events-none">
                        <img
                            src={logo}
                            alt={logoAlt}
                            style={{ height: '160px', width: 'auto', objectFit: 'contain', display: 'block' }}
                        />
                    </div>

                    {/* CTA */}
                    <button
                        type="button"
                        onClick={onCTAClick}
                        className="hidden md:inline-flex items-center h-[38px] px-5 rounded-xl border-0 font-semibold text-sm cursor-pointer transition-all duration-300 hover:opacity-90 hover:shadow-md"
                        style={{ backgroundColor: buttonBgColor, color: buttonTextColor, borderRadius: '14px' }}
                    >
                        Start Project
                    </button>
                </div>

                {/* Cards area — no aria-hidden; use tabIndex to remove focusability when collapsed */}
                <div
                    className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] md:flex-row md:items-end md:gap-[10px] ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}
                >
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            ref={setCardRef(idx)}
                            className="select-none relative flex flex-col gap-2 p-[12px_16px] rounded-xl min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
                            style={{ backgroundColor: item.bgColor, color: item.textColor, borderRadius: '14px' }}
                        >
                            <div className="font-normal tracking-[-0.5px] text-[18px] md:text-[20px]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                {item.label}
                            </div>
                            <div className="mt-auto flex flex-col gap-[2px]">
                                {item.links?.map((lnk, i) => (
                                    <a
                                        key={`${lnk.label}-${i}`}
                                        href={lnk.href}
                                        aria-label={lnk.ariaLabel}
                                        tabIndex={isExpanded ? 0 : -1}
                                        className="inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[14px] md:text-[15px]"
                                        onClick={(e) => handleLinkClick(e, lnk.href)}
                                    >
                                        <GoArrowUpRight className="shrink-0" aria-hidden="true" />
                                        {lnk.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
