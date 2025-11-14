import { HomeBannerDetails } from "@/types/home-banners";

interface Props {
  homeBanner: HomeBannerDetails;
}

export default function HomeBannerDetailsFilters({ homeBanner }: Props) {
  // Agrupar por name
  const groupedFilters = homeBanner.filters.reduce<Record<string, string[]>>(
    (acc, filter) => {
      if (!acc[filter.name]) {
        acc[filter.name] = [];
      }
      acc[filter.name].push(filter.value);
      return acc;
    },
    {}
  );

  return (
    <div className="w-full py-2">
      <h3 className="text-lg font-semibold mb-2">Filtros aplicados</h3>

      <div className="space-y-4">
        {Object.entries(groupedFilters).map(([name, values]) => (
          <div key={name} className="p-2 border rounded-lg bg-muted/20">
            <p className="font-medium capitalize">{name}</p>

            <ul className="list-disc list-inside mt-1 text-sm">
              {values.map((value, idx) => (
                <li key={idx}>{value}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
