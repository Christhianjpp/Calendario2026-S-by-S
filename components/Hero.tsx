import React, { useState, useEffect } from 'react';
import { MonthData } from '../types';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface HeroProps {
  month: MonthData;
  onMonthChange: (idx: number) => void;
}

const Hero: React.FC<HeroProps> = ({ month, onMonthChange }) => {
  const [downloadCount, setDownloadCount] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/download')
      .then(res => res.json())
      .then(data => setDownloadCount(data.count))
      .catch(err => console.error('Error fetching count:', err));
  }, []);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      // 1. Track the download
      const res = await fetch('/api/download', { method: 'POST' });
      const data = await res.json();
      setDownloadCount(data.count);

      // 2. Trigger the file download
      const link = document.createElement('a');
      link.href = '/Calendario2026-S-by-S.pdf';
      link.download = 'Calendario2026-S-by-S.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 3. User Feedback
      toast.success('Planificador descargado correctamente');

      // 4. Reset button state after delay
      setTimeout(() => {
        setIsDownloading(false);
      }, 3000);

    } catch (error) {
      console.error('Error downloading:', error);
      setIsDownloading(false);
    }
  };



  return (
    <section className="relative overflow-hidden pt-12 pb-24 px-6">
      {/* Decorative background numbers */}
      <div className="absolute top-20 left-10 text-[20vw] font-serif font-black text-primary/5 dark:text-white/5 pointer-events-none select-none -z-10">
        2026
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start space-y-10 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-7xl sm:text-9xl font-serif font-black text-primary dark:text-accent leading-[0.8]">
              {month.name}
            </h1>
            <p className="text-4xl sm:text-6xl font-serif font-light text-primary/80 dark:text-accent/80 tracking-widest">
              {month.year}
            </p>
          </div>



          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className={`group flex items-center justify-center gap-3 bg-primary text-white px-8 py-5 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300 ${isDownloading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-primary/20 hover:scale-[1.02]'}`}>
              {isDownloading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="material-icons group-hover:animate-bounce">download</span>
              )}
              {isDownloading ? 'Descargando...' : 'Descargar Planificador'}
            </button>

          </div>


        </div>

        {/* Visual Preview */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg transform hover:scale-[1.02] transition-transform duration-500">
             <div className="absolute inset-0 bg-accent/20 dark:bg-accent/5 rounded-[3rem] blur-3xl -z-10 animate-pulse" />
             <img 
               src="/calendar-preview.png" 
               alt="Vista previa del calendario 2026" 
               className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white/50 dark:border-white/10"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
