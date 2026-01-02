import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Stats: React.FC = () => {
  const [downloadCount, setDownloadCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/download')
      .then(res => res.json())
      .then(data => {
        setDownloadCount(data.count);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgLight dark:bg-bgDark p-6">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-primary/10 dark:border-white/5 animate-fade-in">
        
        <div className="flex flex-col items-center space-y-6">
          <div className="p-4 rounded-full bg-primary/5 dark:bg-white/5">
            <span className="material-icons text-4xl text-primary dark:text-accent">analytics</span>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-serif font-bold text-primary dark:text-accent">
              Estadísticas de Descarga
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total de descargas del Planificador 2026
            </p>
          </div>

          <div className="w-full py-8 text-center bg-primary/5 dark:bg-white/5 rounded-2xl border border-primary/5 dark:border-white/5">
            {loading ? (
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary dark:text-accent" />
            ) : (
              <span className="text-6xl font-serif font-black text-primary dark:text-accent">
                {downloadCount !== null ? downloadCount : 0}
              </span>
            )}
          </div>

          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm font-bold text-primary dark:text-accent hover:underline transition-all"
          >
            <span className="material-icons text-sm">arrow_back</span>
            Volver al inicio
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Stats;
