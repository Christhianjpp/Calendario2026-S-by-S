
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-16 dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
          <div className="text-center md:text-left space-y-2">
            <h4 className="text-3xl font-serif font-bold">Planificador Mensual 2026</h4>
            <p className="text-white/60 font-light tracking-wide italic">Diseñado para tu organización diaria.</p>
          </div>


        </div>

        <div className="h-px w-full bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 font-light uppercase tracking-widest">
          <p>© 2026 Planificador Creativo. Todos los derechos reservados.</p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
