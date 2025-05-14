"use client";

import { Perfume } from "@/types/perfumes";
import Image from "next/image";

interface PerfumeCartProps {
  data: Perfume;
}

export default function PerfumeCard({ data: perfume }: PerfumeCartProps) {
  return (
    <div className=" rounded-2xl border">
      <div className="p-0">
        <div className={`flex items-center`}>
          <div className={`relative h-28 w-28 2xs:h-32 2xs:w-32 flex-shrink-0`}>
            <Image
              className="aspect-square object-cover"
              src={perfume.image || "/images/place-holder.jpg"}
              alt={"image"}
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <h3 className="font-medium text-base sm:text-lg truncate">
                {perfume.name}
              </h3>
              <p className="font-semibold text-sm 2xs:text-base">
                ${perfume.price.toFixed(2)}
              </p>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {perfume.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
