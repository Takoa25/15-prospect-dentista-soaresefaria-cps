import React, { useRef, useState } from 'react';
import { useScroll, motion, AnimatePresence, useTransform } from 'framer-motion';
import { content } from '../Content';
import ScrollReveal from './ScrollReveal';
import { cn } from '../lib/utils';
import {
    ChevronRight,
    Plus,
    ChevronDown
} from 'lucide-react';

// Importando ícones especializados da react-icons (Versões estáveis)
import {
    FaTooth,
    FaTeeth,
    FaTeethOpen,
    FaMicroscope,
    FaRegSmileBeam,
    FaStethoscope,
    FaMagic,
    FaProcedures
} from 'react-icons/fa';
import {
    GiTooth,
    GiMouthWatering,
    GiSparkles
} from 'react-icons/gi';
import {
    MdHealthAndSafety,
    MdCleanHands,
    MdChildCare,
    MdBloodtype
} from 'react-icons/md';
import {
    RiStarSmileLine,
    RiShieldCrossLine
} from 'react-icons/ri';
import {
    BsScissors,
    BsStars
} from 'react-icons/bs';

import { StackingCard } from '@/components/ui/stacking-card';

// Mapeamento de ícones Premium e Específicos para Odontologia
const IconMap: { [key: string]: any } = {
    // Especialidades Principais (Cards)
    'Implantes': GiTooth,
    'Ortodontia': FaTeethOpen,
    'Clareamento': BsStars,
    'Lentes': FaMagic,
    'Reabilitacao': MdHealthAndSafety,

    // Serviços Secundários
    'Canal': FaMicroscope,
    'Limpeza': MdCleanHands,
    'Proteses': FaTeeth,
    'Odontopediatria': MdChildCare,
    'Cirurgia': BsScissors,
    'Bruxismo': RiShieldCrossLine,
    'Periodontia': MdBloodtype,
    'Harmonizacao': RiStarSmileLine,

    // Fallbacks
    'Default': FaTooth,
    'Dna': FaTooth,
    'Smile': FaRegSmileBeam,
    'Sparkles': GiSparkles,
    'Diamond': BsStars,
    'HeartPulse': MdHealthAndSafety,
    'Zap': FaMicroscope,
    'Stethoscope': FaStethoscope,
    'Baby': MdChildCare,
    'Scissors': BsScissors,
    'Moon': RiShieldCrossLine,
    'Star': RiStarSmileLine
};

const ServiceIcon = ({ name, className }: { name?: string, className?: string }) => {
    // Proteção contra crash: se o nome não existe no mapa ou o componente é nulo, usa o dente padrão
    const IconComponent = name ? (IconMap[name] || IconMap['Default']) : IconMap['Default'];

    if (!IconComponent) {
        return <FaTooth className={className} />;
    }

    return <IconComponent className={className} />;
};

const Features: React.FC = () => {
    const { features, infos } = content;
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!features.enabled) return null;

    const { cards, secondaryServices, viewMoreText } = features;
    const mainCards = [cards.card1, cards.card2, cards.card3, cards.card4, cards.card5];

    // Mapeamento manual de ícones para garantir que cada um seja único e representativo
    const mainCardIcons = ['Implantes', 'Ortodontia', 'Clareamento', 'Lentes', 'Reabilitacao'];
    const secondaryServiceIcons = ['Canal', 'Limpeza', 'Proteses', 'Odontopediatria', 'Cirurgia', 'Bruxismo', 'Periodontia', 'Harmonizacao'];

    const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.08], [0, -40]);

    return (
        <section className="w-full relative overflow-visible" id="features">
            <div
                ref={containerRef}
                className="relative w-full overflow-visible"
                style={{ height: isMobile ? '600vh' : '400vh' }}
            >
                <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-visible bg-slate-50/50">
                    <motion.div
                        style={{ opacity: headerOpacity, y: headerY }}
                        className="container-custom absolute top-[16vh] z-0"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <span className="border border-primary rounded-full px-5 py-2 text-sm font-medium font-grotesk text-neutral-800 bg-white shadow-sm">
                                {features.pill}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0"></div>
                            <div className="h-px bg-neutral-200 flex-1"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0"></div>
                        </div>

                        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                            <h2 className="font-grotesk text-4xl md:text-5xl lg:text-7xl font-bold text-black leading-[1.05] uppercase tracking-tighter max-w-2xl">
                                {features.headline}
                            </h2>
                            <p className="text-neutral-500 text-base md:text-lg leading-relaxed font-inter max-w-md md:pt-2">
                                {features.subHeadline}
                            </p>
                        </div>
                    </motion.div>

                    {mainCards.map((card, i) => {
                        const totalSlots = mainCards.length;
                        const totalEnd = isMobile ? 0.95 : 0.85; // Onde tudo termina
                        const startOffset = 0.08;
                        const slotSize = (totalEnd - startOffset) / totalSlots;

                        const start = startOffset + (i * slotSize);
                        const end = startOffset + ((i + 1) * slotSize);

                        return (
                            <StackingCard
                                key={`main_${i}`}
                                i={i}
                                total={mainCards.length}
                                title={card.title}
                                description={card.description}
                                url={card.image}
                                color={card.color || "#FFFFFF"}
                                progress={scrollYProgress}
                                range={[start, end, totalEnd]}
                                ctaText="Agendar Consulta"
                                onCtaClick={() => {
                                    const message = encodeURIComponent(card.whatsappMessage || `Olá! Vim pelo site e quero agendar um(a) ${card.title}.`);
                                    window.open(`https://wa.me/${infos.whatsapp}?text=${message}`, '_blank');
                                }}
                                tagText={card.tagText || "Especialidade"}
                                icon={<ServiceIcon name={mainCardIcons[i]} className="w-5 h-5" />}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="relative z-[110] bg-slate-50/50 pb-24 border-none">
                <div className="container-custom">
                    <ScrollReveal className="flex justify-center mb-16">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="group relative bg-black text-white px-10 py-5 md:px-12 md:py-6 rounded-xl font-grotesk font-bold text-lg md:text-xl uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                {isExpanded ? features.viewLessText : features.viewMoreText}
                                <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <ChevronDown size={28} />
                                </motion.div>
                            </span>
                            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>
                    </ScrollReveal>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="max-w-4xl mx-auto space-y-3"
                            >
                                {secondaryServices.map((service, idx) => (
                                    <ServiceAccordionItem
                                        key={idx}
                                        service={service}
                                        iconName={secondaryServiceIcons[idx]}
                                        infos={infos}
                                    />
                                ))}

                                {/* CTA de Fechamento ou Outro Caso */}
                                <div className="pt-8 flex flex-col items-center">
                                    <div className="bg-primary/5 border border-primary/10 p-6 md:p-8 rounded-[32px] w-full text-center relative overflow-hidden group">
                                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                            <div className="flex items-center gap-4 text-left">
                                                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shrink-0">
                                                    <Plus size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="font-grotesk font-bold text-xl uppercase text-black">Pecisa de outro tratamento?</h4>
                                                    <p className="text-neutral-500 text-sm">Nossa equipe está pronta para avaliar seu caso clinicamente.</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => window.open(`https://wa.me/${infos.whatsapp}`, '_blank')}
                                                className="bg-primary text-white px-10 py-4 rounded-xl font-bold font-grotesk uppercase text-xs hover:scale-105 transition-transform shadow-lg whitespace-nowrap"
                                            >
                                                Falar com Consultor
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

// Componente Interno para cada item do Accordion
const ServiceAccordionItem: React.FC<{ service: any, iconName: string, infos: any }> = ({ service, iconName, infos }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
            >
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-colors",
                        isOpen ? "bg-primary text-white" : "bg-neutral-50 text-secondary"
                    )}>
                        <ServiceIcon name={iconName} className={cn("w-5 h-5 md:w-6 md:h-6", isOpen ? "text-white" : "text-primary")} />
                    </div>
                    <h4 className="font-grotesk font-bold text-lg md:text-xl text-black uppercase tracking-tight">
                        {service.title}
                    </h4>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={20} className="text-neutral-400" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 md:pl-[72px]">
                            <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                                {service.description}
                            </p>
                            <button
                                onClick={() => {
                                    const message = encodeURIComponent(service.whatsappMessage || `Olá! Vim pelo site e gostaria de saber mais sobre ${service.title}.`);
                                    window.open(`https://wa.me/${infos.whatsapp}?text=${message}`, '_blank');
                                }}
                                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold font-grotesk text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
                            >
                                Chamar no WhatsApp <ChevronRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Features;
