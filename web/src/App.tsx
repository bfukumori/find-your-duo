import "./styles/main.css";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { api } from "./lib/axios";
import logoImg from "./assets/logo.svg";

import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import { CreateAdModal } from "./components/CreateAdModal";

interface Games {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function App() {
  const [games, setGames] = useState<Games[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchGames() {
      const response = await api.get("/games");
      const gamesData = response.data;
      setGames(gamesData);
    }
    fetchGames();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col  items-center  my-20 px-8">
      <img src={logoImg} alt="" />
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-black mt-20 ">
        Seu{" "}
        <span className="nlw-gradient text-transparent bg-clip-text">duo</span>{" "}
        está aqui.
      </h1>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}
