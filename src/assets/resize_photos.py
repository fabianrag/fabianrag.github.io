import os
from PIL import Image


def resize_images(folder_path, max_width=1200, max_height=800):
    """
    Redimensiona todas las imágenes de 'folder_path' a un tamaño máximo de
    (max_width x max_height), manteniendo la proporción.
    """

    # Crea una carpeta de salida (opcional) para no sobreescribir originales.
    output_folder = os.path.join(folder_path, "resized")
    os.makedirs(output_folder, exist_ok=True)

    # Recorre todos los archivos del directorio
    for filename in os.listdir(folder_path):
        if filename.lower().endswith((".jpg", ".jpeg", ".png")):
            old_path = os.path.join(folder_path, filename)
            new_path = os.path.join(output_folder, filename)

            # Abre la imagen con Pillow
            with Image.open(old_path) as img:
                # Redimensiona con thumbnail (mantiene la relación de aspecto)
                img.thumbnail((max_width, max_height))

                # Guarda con calidad aceptable
                img.save(new_path, quality=85)
                print(f"Redimensionada: {filename} -> {new_path}")


if __name__ == "__main__":
    # Ajusta esta ruta a la carpeta donde tienes las 317 fotos
    folder = "/home/nonfreak/consueloyfabian-cl/public/photos"
    resize_images(folder, max_width=1200, max_height=800)
    print("Proceso de redimensionado finalizado.")
