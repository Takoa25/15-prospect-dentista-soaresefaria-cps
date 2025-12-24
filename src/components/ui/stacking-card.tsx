import React, { ReactNode, useState, useEffect } from 'react';
import { useTransform, motion, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
    i: number;
    total: number;
    title: string;
    description: string;
    url: string;
    color: string;
    progress: MotionValue<number>;
    range: [number, number, number];
    ctaText?: string;
    onCtaClick?: () => void;
    icon?: ReactNode;
    tagText?: string;
}

export const StackingCard = ({
    i,
    total,
    title,
    description,
    url,
    color,
    progress,
    range,
    ctaText = "Ver mais",
    onCtaClick,
    icon,
    tagText
}: CardProps) => {
    const start = range[0];
    const end = range[1];
    const absoluteEnd = range[2];
    const isLast = i === total - 1;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const entranceWindow = isMobile ? 0.15 : 0.08;

    // 1. Posição Vertical (Entrada)
    const yMovement = useTransform(
        progress,
        [start - entranceWindow, start],
        ["120vh", "0vh"]
    );

    // 2. Escala e Profundidade 3D Progressiva
    // A animação acontece enquanto o deck está sendo montado, mas PARA NO ABSOLUTE END (1.0).
    const scale = useTransform(
        progress,
        [start, end, absoluteEnd],
        [1, 1, isLast ? 1 : 1 - (total - i) * 0.05]
    );

    // Brilho: O último card não escurece nunca.
    const brightness = useTransform(
        progress,
        [start, end, absoluteEnd],
        ["brightness(100%)", "brightness(100%)", isLast ? "brightness(100%)" : `brightness(${80 - (total - i) * 5}%)`]
    );

    // Fade in suave
    const opacity = useTransform(
        progress,
        [start - entranceWindow, start],
        [0, 1]
    );

    // 3. Efeito Pasta (Reduzido para mobile para evitar cortes, proporcional no desktop)
    // Usamos um valor base que garante visibilidade do card todo.
    const topOffset = 18 + (i * 2.5);

    return (
        <motion.div
            style={{
                y: yMovement,
                scale,
                opacity,
                filter: brightness,
                zIndex: i,
                backgroundColor: color,
                top: `${topOffset}vh`,
                left: '50%',
                x: '-50%',
            }}
            className={cn(
                "absolute flex flex-col md:flex-row h-[460px] md:h-[450px] w-[92%] md:w-[850px] lg:w-[1000px] rounded-[32px] p-6 md:p-12 origin-top shadow-2xl overflow-visible border border-black/5"
            )}
        >
            {/* Lado do Texto */}
            <div className="w-full md:w-[48%] flex flex-col justify-between relative z-10 order-1 md:order-1 mb-4 md:mb-0 text-left">
                <div>
                    {tagText && (
                        <div className="flex items-center gap-2 mb-4 md:mb-6">
                            {icon && <div className="text-primary w-5 h-5 flex items-center justify-center">{icon}</div>}
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 font-grotesk">{tagText}</span>
                        </div>
                    )}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-grotesk uppercase leading-tight mb-4 md:mb-6">{title}</h2>
                    <p className="text-sm md:text-base opacity-70 leading-relaxed max-w-[400px] font-inter">{description}</p>
                </div>

                <div className="mt-4 md:mt-auto">
                    <button
                        onClick={onCtaClick}
                        className='group flex items-center gap-3 py-3 px-6 md:py-4 md:px-8 bg-primary text-white rounded-xl font-bold font-grotesk text-xs md:text-sm uppercase tracking-widest hover:brightness-110 transition-all w-fit shadow-lg'
                    >
                        {ctaText}
                        <svg
                            width='18'
                            height='10'
                            viewBox='0 0 22 12'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className="group-hover:translate-x-1 transition-transform"
                        >
                            <path
                                d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                                fill='currentColor'
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Lado da Imagem */}
            <div className="relative w-full md:w-[52%] h-[180px] md:h-full rounded-[24px] overflow-hidden order-2 md:order-2 shadow-inner border border-black/5">
                <img
                    src={url}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
        </motion.div>
    );
};
