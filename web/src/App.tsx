import "./styles/main.css";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { api } from "./lib/axios";
import logoImg from "./assets/logo.svg";
import { GameController } from "phosphor-react";

import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";

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
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>
            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <input
                  id="game"
                  type="text"
                  placeholder="Selecione o game que deseja jogar"
                  className="input-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold">
                  Seu nome (ou nickname)
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Como te chamam dentro do game?"
                  className="input-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying" className="font-semibold">
                    Joga há quantos anos?
                  </label>
                  <input
                    id="yearsPlaying"
                    type="number"
                    placeholder="Tudo bem ser ZERO"
                    className="input-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord" className="font-semibold">
                    Qual seu discord?
                  </label>
                  <input
                    id="discord"
                    type="text"
                    placeholder="Usuário#0000"
                    className="input-primary"
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekdays" className="font-semibold">
                    Quando costuma jogar?
                  </label>
                  <div className="grid grid-cols-4 gap-2 ">
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Domingo"
                    >
                      D
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Segunda"
                    >
                      S
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Terça"
                    >
                      T
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Quarta"
                    >
                      Q
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Quinta"
                    >
                      Q
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Sexta"
                    >
                      S
                    </button>
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Sábado"
                    >
                      S
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart" className="font-semibold">
                    Qual horário do dia?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      id="hourStart"
                      type="time"
                      placeholder="De"
                      className="input-primary"
                    />
                    <input
                      id="hourEnd"
                      type="time"
                      placeholder="Até"
                      className="input-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex gap-2 text-sm">
                <input id="voice" type="checkbox" />
                <label htmlFor="voice">
                  Costumo me conectar no chat de voz
                </label>
              </div>
              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close type="button" className="btn-secondary">
                  Cancelar
                </Dialog.Close>
                <button type="submit" className="btn-primary">
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
