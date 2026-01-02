
import React from 'react';
import { FEATURES } from '../constants.tsx';

const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-zinc-900/50 py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-primary dark:text-accent mb-20">
          Detalles del Diseño
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {FEATURES.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-10 rounded-[2.5rem] bg-bgLight dark:bg-zinc-800 border border-primary/5 dark:border-white/5 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-accent/20 dark:bg-accent/10 rounded-2xl flex items-center justify-center mb-8 text-primary dark:text-accent transition-transform group-hover:scale-110 group-hover:rotate-3">
                <span className="material-icons text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary dark:text-accent mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
