export interface Perfume {
  id: string;
  name: string;
  brand: string;
  gender: string;
  scents: string[];
  liters: number;
  perfumeType: string;
  available: boolean;
  price: number;
  cant: number;
}

export interface PerfumeCreateDTO {
  name: string;
  brandId: string;
  gender: string;
  scentsId: string[];
  liters: number;
  perfumeTypeId: string;
  available: true;
  price: number;
  cant: number;
  offerId: string;
}
