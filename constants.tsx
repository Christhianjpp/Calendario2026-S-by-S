
import React from 'react';
import { MonthData, Feature } from './types';

export const MONTHS: MonthData[] = [
  { id: 0, name: 'Enero', year: 2026, days: 31, startDay: 4 }, // 2026 starts on Thursday
  { id: 1, name: 'Febrero', year: 2026, days: 28, startDay: 0 },
  { id: 2, name: 'Marzo', year: 2026, days: 31, startDay: 0 },
  { id: 3, name: 'Abril', year: 2026, days: 30, startDay: 3 },
  { id: 4, name: 'Mayo', year: 2026, days: 31, startDay: 5 },
  { id: 5, name: 'Junio', year: 2026, days: 30, startDay: 1 },
];

export const FEATURES: Feature[] = [
  {
    icon: 'print',
    title: 'Listo para Imprimir',
    description: 'Formato A4 y Carta optimizado para alta resolución. Colores calibrados para impresión doméstica.'
  },
  {
    icon: 'edit_note',
    title: 'Espacio para Metas',
    description: 'Sección lateral dedicada para tus objetivos mensuales, notas importantes y recordatorios.'
  },
  {
    icon: 'spa',
    title: 'Estilo Minimalista',
    description: 'Diseño limpio y orgánico con motivos florales sutiles que no distraen de tu planificación.'
  }
];

export const FLOWER_SVG = (
  <svg className="w-24 h-24 text-accent/40 fill-current" viewBox="0 0 100 100">
    <path d="M50 35 C50 15 25 15 25 35 C15 35 15 60 35 60 C35 70 25 80 50 75 C75 80 65 70 65 60 C85 60 85 35 65 35 C65 15 40 15 50 35 Z" />
  </svg>
);
