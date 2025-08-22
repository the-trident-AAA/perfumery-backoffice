import { HomeBannerDetails } from "@/types/home-banners";

interface Props {
  homeBanner: HomeBannerDetails;
}

export default function HomeBannerDetailsTips({
  homeBanner: { statisticalTips, infoTips },
}: Props) {
  return (
    <div className="space-y-6">
      {/* Statistical Tips Section */}
      {statisticalTips && statisticalTips.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Estadísticas
          </h3>
          <div className="grid gap-3">
            {statisticalTips.map((tip, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="text-2xl font-bold text-blue-700">
                      {tip.statistics}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {tip.info}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Tips Section */}
      {infoTips && infoTips.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            Consejos e Información
          </h3>
          <div className="space-y-2">
            {infoTips.map((tip, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3 hover:shadow-sm transition-shadow duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed flex-1">
                    {tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!statisticalTips || statisticalTips.length === 0) &&
        (!infoTips || infoTips.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm">
              No hay consejos o estadísticas disponibles
            </p>
          </div>
        )}
    </div>
  );
}
