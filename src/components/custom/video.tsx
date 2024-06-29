"use client";

import { useEffect, useRef } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';

export default function VideoComponent({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Recarregar o vídeo quando a URL mudar
      videoRef.current.play();
    }
  }, [url]); // Adicionado 'url' como dependência para reagir às mudanças na URL

  return (
    <video
      ref={videoRef}
      width="full"
      preload="none"
      loop
      muted // Adicionado para garantir que o autoplay funcione em todos os navegadores
      className='w-full rounded-3xl border-8 border-[#528AA5] bg-[#528AA5]'
    >
      <source src={url} type="video/mp4" />
      <p className='text-primary'>Your browser does not support the video tag.</p>
    </video>
  );
}
