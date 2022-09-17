import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { CaretDown, CaretUp, Check, GameController } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Game {
  id: string;
  title: string;
}

const weekDays = [
  { title: "Domingo", abbr: "D", value: "0" },
  { title: "Segunda", abbr: "S", value: "1" },
  { title: "Terça", abbr: "T", value: "2" },
  { title: "Quarta", abbr: "Q", value: "3" },
  { title: "Quinta", abbr: "Q", value: "4" },
  { title: "Sexta", abbr: "S", value: "5" },
  { title: "Sábado", abbr: "S", value: "6" },
];

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  async function handleCreateAd(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log({
      ...data,
      yearsPlaying: Number(data.yearsPlaying),
      weekDays: selectedWeekDays,
      useVoiceChannel,
    });
    // try {
    //   await api.post(`/games/${data.game}/ads`, {
    //     ...data,
    //     yearsPlaying: Number(data.yearsPlaying),
    //     weekDays: selectedWeekDays,
    //     useVoiceChannel,
    //   });
    //   alert("Anúncio criado com sucesso!");
    // } catch (error) {
    //   console.log(error);
    //   alert("Não foi possível criar o anúncio.");
    // }
  }

  useEffect(() => {
    async function fetchGames() {
      const response = await api.get("/games");
      const gamesData = response.data;
      setGames(gamesData);
    }
    fetchGames();
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <Select.Root name="game">
              <Select.Trigger className="input-primary flex justify-between items-center">
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown className="w-6 h-6 text-zinc-400" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-zinc-900 rounded px-2 py-2">
                  <Select.ScrollUpButton className=" mx-auto">
                    <CaretUp className="w-4 h-4 text-zinc-400" />
                  </Select.ScrollUpButton>
                  <Select.Viewport>
                    {games.map((game) => (
                      <Select.Item
                        key={game.id}
                        value={game.id}
                        className="text-white cursor-default rounded p-2 hover:bg-zinc-600 text-sm"
                      >
                        <Select.ItemText>{game.title}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton className=" mx-auto">
                    <CaretDown className="w-4 h-4 text-zinc-400" />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Seu nome (ou nickname)
            </label>
            <input
              id="name"
              name="name"
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
                name="yearsPlaying"
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
                name="discord"
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

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                onValueChange={setSelectedWeekDays}
                value={selectedWeekDays}
              >
                {weekDays.map((weekday) => (
                  <ToggleGroup.Item
                    key={weekday.title}
                    className={`w-8 h-8 rounded  ${
                      selectedWeekDays.includes(weekday.value)
                        ? "bg-violet-500"
                        : "bg-zinc-900"
                    }`}
                    title={weekday.title}
                    value={weekday.value}
                  >
                    {weekday.abbr}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold">Qual horário do dia?</label>
              <div className="grid grid-cols-1 gap-2 justify-items-end">
                <div className="flex items-center gap-2">
                  <label htmlFor="hourStart">De:</label>
                  <input
                    id="hourStart"
                    name="hourStart"
                    type="time"
                    placeholder="De"
                    className="bg-zinc-900 px-2 h-8 rounded text-sm flex-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="hourEnd">Até:</label>
                  <input
                    id="hourEnd"
                    name="hourEnd"
                    type="time"
                    placeholder="Até"
                    className="bg-zinc-900 px-2 h-8 rounded text-sm flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex gap-2 text-sm items-center">
            <Checkbox.Root
              id="voice"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === "indeterminate") {
                  setUseVoiceChannel(false);
                } else {
                  setUseVoiceChannel((prevState) => !prevState);
                }
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor="voice">Costumo me conectar no chat de voz</label>
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
  );
}
