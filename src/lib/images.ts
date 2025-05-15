export async function urlToFile(imageUrl: string, fileName?: string): Promise<File> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Error al obtener la imagen: ${response.status} ${response.statusText}`
      );
    }
    const blob = await response.blob();

    const finalFileName = fileName || imageUrl.split("/").pop() || "image";

    const file = new File([blob], finalFileName, {
      type: blob.type || "image/png",
      lastModified: new Date().getTime(),
    });

    return file;
  } catch (error) {
    console.error("Error en urlToFile:", error);
    throw error;
  }
}
