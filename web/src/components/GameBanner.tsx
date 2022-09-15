interface GameBannerProps {
  title: string;
  bannerUrl: string;
  adsCount: number;
}

export function GameBanner({ title, bannerUrl, adsCount }: GameBannerProps) {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden hover:scale-110 transition ease-in"
    >
      <img src={bannerUrl} alt="" className="w-full" />
      <div className="absolute bottom-0 left-0 w-full pt-16 pb-4 px-4 bg-gradient-to-t from-black/90">
        <strong className="font-bold text-white block ">{title}</strong>
        <span className="text-sm text-zinc-300  block">
          {adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
}
