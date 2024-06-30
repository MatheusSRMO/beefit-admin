import Profile, { ProfileProps } from "@/components/custom/profile";
import TitleSection from "@/components/custom/title-section";
import { Button } from "@/components/ui/button";
import { BellRingIcon, CalendarIcon } from "lucide-react";
import React from "react";

export default function Home() {
  return (
    <main className="h-screen px-10 pb-10">

      <TitleSection title="Treinos">
        <TitleSection.Button title="Acidionar Treino" />
      </TitleSection>

      {
        Array(50).fill(0).map((_, index) => (
          <div key={index} className="h-20 bg-slate-500 rounded-lg my-5" />
        ))
      }
    </main>
  );
}
