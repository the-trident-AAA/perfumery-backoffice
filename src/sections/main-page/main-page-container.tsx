import InformationCard from "@/components/information-card/information-card";
import { paths } from "@/routes/path";

export default function MainPageContainer() {
  return (
    <div className="flex-1 container mx-auto flex flex-col min-h-screen items-center justify-center px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Bienvenido al Panel de Administración
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Gestione su tienda, productos, pedidos y clientes desde un solo lugar.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <InformationCard
          title="Comenzar a Administrar"
          description="Acceda al panel de control para gestionar todos los aspectos de su tienda."
          buttonText="Comenzar a Administrar"
          href={paths.perfumes.root}
        />
        <InformationCard
          title="Ver Página de la Tienda"
          description="Visite la página web de su tienda para ver cómo la ven sus
                clientes."
          buttonText="Ver Tienda"
          href={paths.perfumes.root}
        />
      </div>
    </div>
  );
}
