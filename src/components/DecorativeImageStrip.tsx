import Image from "next/image";
import { decorativeMedia, type MediaAsset } from "@/data/media";

type DecorativeImageStripProps = {
  assets?: MediaAsset[];
  limit?: number;
};

export function DecorativeImageStrip({ assets = decorativeMedia, limit = 3 }: DecorativeImageStripProps) {
  const visibleAssets = assets.slice(0, limit);

  return (
    <div className="grid gap-3 sm:grid-cols-3" aria-hidden="true">
      {visibleAssets.map((asset) => (
        <div key={asset.src} className="relative h-40 overflow-hidden rounded-lg border border-white/10 bg-night-800 sm:h-52">
          <Image src={asset.src} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night-900/70 via-transparent to-transparent" />
        </div>
      ))}
    </div>
  );
}
