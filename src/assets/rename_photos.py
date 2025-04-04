import os


def rename_photos_sequentially(folder_path):
    # Lista todos los archivos del directorio (ignora subdirectorios)
    files = [
        f
        for f in os.listdir(folder_path)
        if os.path.isfile(os.path.join(folder_path, f))
    ]

    # Orden alfabético (opcional, para tener un orden determinístico)
    files.sort()

    # Recorre y renombra cada archivo de forma secuencial
    index = 1
    for filename in files:
        old_path = os.path.join(folder_path, filename)
        new_name = f"{index}.jpg"  # Asigna el nuevo nombre con extensión .jpg
        new_path = os.path.join(folder_path, new_name)

        os.rename(old_path, new_path)
        index += 1


# Ejecución:
folder = "/home/nonfreak/consueloyfabian-cl/public/photos"
rename_photos_sequentially(folder)
print("Fotos renombradas secuencialmente.")
