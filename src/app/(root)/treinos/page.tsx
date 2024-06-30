"use client";

import TitleSection from '@/components/custom/title-section';
import React from 'react';

export default function TrainingPage() {
  return (
    <main className="h-screen px-10 pb-10">
      <TitleSection title="Treinos">
        <TitleSection.Button title="Acidionar Treino" onClick={() => {
          alert('Adicionar treino')
        
        }} />
      </TitleSection>
    </main>
  )
}
