import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="self-stretch mt-8 rounded-lg border-t-4 border-transparent nlw-gradient overflow-hidden">
      <div className="bg-[#2A2634] px-8 py-6 flex flex-wrap sm:flex-nowrap items-center justify-between">
        <div className="w-full">
          <strong className="text-xl lg:text-2xl text-white font-black block text-center sm:text-left">
            Não encontrou seu duo?{" "}
          </strong>
          <span className="text-zinc-400 block mt-1 mr-1 text-center sm:text-left">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger
          type="button"
          className="btn-primary text-white mt-4 sm:mt-0 flex-1 sm:flex-initial justify-center whitespace-nowrap"
        >
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
