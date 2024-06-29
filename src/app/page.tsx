import NavBar from "@/components/custom/nav-bar";

export default function Home() {
  return (
    <main className="h-screen px-10 pb-10">
      
      {
        Array(50).fill(0).map((_, index) => (
          <div key={index} className="h-20 bg-slate-500 rounded-lg my-5" />
        ))
      }
    </main>
  );
}
