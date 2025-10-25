type PredefinedFormat =
  | "short"
  | "long"
  | "numeric"
  | "monthYear"
  | "year"
  | "time"
  | "datetime"
  | "full"
  | "yymmdd";

interface CustomFormatOptions {
  locale?: string;
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  weekday?: "long" | "short" | "narrow";
  timeZone?: string;
}

export const formatDate = (
  dateString: string,
  format: PredefinedFormat | CustomFormatOptions = "long"
) => {
  const date = new Date(dateString);

  const predefinedFormats: Record<PredefinedFormat, CustomFormatOptions> = {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
    numeric: {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    },
    monthYear: {
      year: "numeric",
      month: "long",
    },
    year: {
      year: "numeric",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
    datetime: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
    full: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    },
    yymmdd: {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    },
  };

  // Si es el formato yymmdd, necesitamos un manejo especial para asegurar el formato YY/MM/DD
  if (format === "yymmdd") {
    const year = date.getFullYear().toString().slice(-2); // Últimos 2 dígitos del año
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mes con 2 dígitos
    const day = date.getDate().toString().padStart(2, "0"); // Día con 2 dígitos

    return `${year}/${month}/${day}`;
  }

  const options =
    typeof format === "string" ? predefinedFormats[format] : format;

  const defaultLocale = "es-ES";

  return date.toLocaleDateString(options.locale || defaultLocale, options);
};

export const getDateDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths < 1) {
    return `${diffDays} días`;
  } else if (diffMonths < 12) {
    return `${diffMonths} ${diffMonths === 1 ? "mes" : "meses"}`;
  } else {
    const years = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;
    return `${years} ${years === 1 ? "año" : "años"}${
      remainingMonths > 0
        ? ` y ${remainingMonths} ${remainingMonths === 1 ? "mes" : "meses"}`
        : ""
    }`;
  }
};
