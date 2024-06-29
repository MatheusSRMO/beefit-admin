import Profile, { ProfileProps } from "@/components/custom/profile";
import TitleSection from "@/components/custom/title-section";
import { Button } from "@/components/ui/button";
import { BellRingIcon, CalendarIcon } from "lucide-react";
import React from "react";

const ProfileHeader = (profileProps : ProfileProps) => {
  return (
    <div className="h-20 bg-[#192C64] rounded-xl w-full flex items-center px-10 justify-between">
      <Profile
        url={profileProps.url}
        firstName={profileProps.firstName}
        lastName={profileProps.lastName}
        size={profileProps.size}
      />

      <div className="flex gap-5">
        <Button variant="link" size="icon">
          <CalendarIcon className="text-primary" />
        </Button>
        <Button variant="link" size="icon">
          <BellRingIcon className="text-primary" />
        </Button>
      </div>
    </div>
  )
}
export default function Home() {
  return (
    <main className="h-screen px-10 pb-10">

      <TitleSection title="Treinos">
        <TitleSection.Button title="Acidionar Treino" onClick={() => {
          alert('Adicionar treino');
        }} />
      </TitleSection>

      <ProfileHeader
        url="https://github.com/MatheusSRMO.png"
        firstName='Matheus'
        lastName='Ribeiro'
        size='md'
      />

      {
        Array(50).fill(0).map((_, index) => (
          <div key={index} className="h-20 bg-slate-500 rounded-lg my-5" />
        ))
      }
    </main>
  );
}
