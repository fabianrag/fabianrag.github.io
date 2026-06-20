import os

# Número inicial
start_number = 180

# Carpeta actual
folder = os.getcwd()

# Obtener lista de archivos .webp (solo archivos, no carpetas)
files = [
    f
    for f in os.listdir(folder)
    if os.path.isfile(os.path.join(folder, f)) and f.lower().endswith(".webp")
]

# Ordenar alfabéticamente
files.sort()

# Renombrar cada archivo
for i, filename in enumerate(files):
    new_name = f"matri-{start_number + i}-mobile.webp"

    old_path = os.path.join(folder, filename)
    new_path = os.path.join(folder, new_name)

    os.rename(old_path, new_path)
    print(f"{filename}  →  {new_name}")
