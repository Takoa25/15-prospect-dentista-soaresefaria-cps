import React from 'react';
import { content } from '../Content';
import ScrollReveal from './ScrollReveal';

const Team: React.FC = () => {
    const { team } = content;

    if (!team.enabled) return null;

    return (
        <section className="w-full bg-white py-16 md:py-24" id="team">
            <div className="container-custom">
                {/* Header Full Width with Pill and Line */}
                <ScrollReveal>
                    <div className="flex items-center gap-4 mb-12">
                        <span className="border border-primary rounded-full px-5 py-2 text-sm font-medium font-grotesk text-neutral-800 bg-neutral-50">
                            {team.pill}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                        <div className="h-px bg-neutral-200 flex-1"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    </div>

                    <div className="flex flex-col items-start text-left gap-6 mb-16 max-w-4xl">
                        <h2 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] uppercase tracking-tight whitespace-pre-line">
                            {team.headline}
                        </h2>
                        <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl">
                            {team.subHeadline}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Team Grid - Centralizado para 2 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {team.members.map((member, index) => (
                        <ScrollReveal key={index} delay={index * 0.1} className="h-full">
                            <div className="group relative w-full aspect-[3/4] rounded-[32px] overflow-hidden cursor-pointer">
                                {/* Background Image with Scale Effect on Hover */}
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Glassmorphism Info Card at Bottom */}
                                <div className="absolute bottom-4 left-4 right-4 p-6 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg transition-all duration-300 group-hover:bg-black/70">
                                    <h3 className="font-grotesk font-bold text-2xl text-white uppercase tracking-wide mb-1 transition-colors duration-300 group-hover:text-primary">
                                        {member.name}
                                    </h3>
                                    <p className="font-grotesk text-white/80 text-sm uppercase tracking-wider mb-1">
                                        {member.role}
                                    </p>
                                    {member.cro && (
                                        <p className="font-grotesk text-white/60 text-xs uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-primary/90 mt-1">
                                            {member.cro}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
