import { redirect } from "next/navigation";
import React from "react";

export default function Home() {

  redirect("/alunos");

  return (
    <main className="h-screen px-10 pb-10">

    </main>
  );
}
