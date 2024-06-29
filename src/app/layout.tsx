import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SideBar from "@/components/custom/side-bar";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavBar from "@/components/custom/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeeFit",
  description: "Painel administrativo do BeeFit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.className, "flex flex-row h-screen bg-background")}>
        <SideBar className="h-full w-72 z-10" />
        <ScrollArea className="h-full flex-1">
          <NavBar />
          <div className="flex-1 mt-32">

            {children}
          </div>
        </ScrollArea>
      </body>
    </html>
  );
}
