import PerfumesContainer from "@/sections/perfumes/perfumes-container";
import { Perfume } from "@/types/perfumes";
import React from "react";

const perfumes: Perfume[] = [
  {
    id: "1",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
];

export default function PerfumesPage() {
  return (
    <>
      <PerfumesContainer perfumes={perfumes} />
    </>
  );
}
