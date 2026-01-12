
import React from 'react';
import { MonthData } from '../types';
import { FLOWER_SVG } from '../constants.tsx';

interface PlannerPreviewProps {
  month: MonthData;
}

const PlannerPreview: React.FC<PlannerPreviewProps> = ({ month }) => {
  const days = Array.from({ length: month.days }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: month.startDay }, (_, i) => i);
  const weekdays = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

  return (
    <div className="animate-float origin-center transform rotate-2">
      <div className="bg-white dark:bg-zinc-800 p-2 md:p-3 rounded-xl shadow-2xl ring-1 ring-black/5">
        <div className="border border-gray-100 dark:border-zinc-700 rounded-lg p-6 md:p-10 bg-[#FFFAF8] dark:bg-zinc-900/50 min-h-[500px] flex flex-col">
          
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-1">
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-accent leading-none">
                {month.name}
              </h3>
              <p className="text-xl md:text-2xl font-serif font-light text-primary/60 dark:text-accent/40">
                {month.year}
              </p>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 scale-150 transform transition-transform group-hover:rotate-12 duration-700">
                {FLOWER_SVG}
              </div>
              <div className="relative z-10 font-script text-3xl text-primary dark:text-accent/90 transform -rotate-12 py-6 px-4">
                Metas
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px mb-2 border-b border-primary/20 dark:border-accent/20 pb-2">
            {weekdays.map(day => (
              <div key={day} className="text-[10px] md:text-xs font-bold text-center text-primary/70 dark:text-accent/70 tracking-tighter">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px flex-grow bg-gray-200 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-700">
            {emptyDays.map(i => (
              <div key={`empty-${i}`} className="bg-white dark:bg-zinc-900 min-h-[40px] md:min-h-[60px]" />
            ))}
            {days.map(day => (
              <div key={day} className="bg-white dark:bg-zinc-900 min-h-[40px] md:min-h-[60px] p-1.5 md:p-2 text-[10px] md:text-xs font-serif text-primary dark:text-accent/60">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <div className="h-[1px] w-full bg-primary/10 dark:bg-white/5" />
            <div className="h-[1px] w-full bg-primary/10 dark:bg-white/5" />
            <div className="h-[1px] w-full bg-primary/10 dark:bg-white/5" />
          </div>

          {/* Decorative leaf/stamp bottom-left */}
          <div className="absolute -bottom-10 -left-10 opacity-20 transform -rotate-45 scale-150 pointer-events-none">
            <span className="material-icons text-[120px] text-accent">eco</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPreview;
