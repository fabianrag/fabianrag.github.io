#!/usr/bin/env python3
import argparse
import os
from pathlib import Path

from PIL import Image
import imagehash

def compute_phash_map(folder: Path):
    """Devuelve dict: ruta -> phash"""
    hashes = {}
    for p in sorted(folder.glob("*.webp")):
        try:
            with Image.open(p) as im:
                hashes[p] = imagehash.phash(im)
        except Exception as e:
            print(f"[WARN] No se pudo hashear {p.name}: {e}")
    return hashes

def propose_desktop_name(mobile_name: str) -> str:
    """A partir del nombre mobile propone nombre para desktop."""
    stem = mobile_name[:-5] if mobile_name.lower().endswith(".webp") else mobile_name
    if "-mobile" in stem:
        stem = stem.replace("-mobile", "-desktop")
    else:
        stem = f"{stem}-desktop"
    return stem + ".webp"

def main():
    ap = argparse.ArgumentParser(description="Empareja imágenes desktop con mobile por similitud visual y renombra desktop.")
    ap.add_argument("--mobile", default="mobile", help="Carpeta de imágenes mobile (default: mobile)")
    ap.add_argument("--desktop", default="desktop", help="Carpeta de imágenes desktop (default: desktop)")
    ap.add_argument("--threshold", type=int, default=6, help="Umbral de distancia Hamming (0=idéntico, recomendado 4–8). Default: 6")
    ap.add_argument("--dry-run", action="store_true", help="Simulación: NO renombra, solo muestra lo que haría.")
    args = ap.parse_args()

    mobile_dir = Path(args.mobile).resolve()
    desktop_dir = Path(args.desktop).resolve()

    if not mobile_dir.is_dir() or not desktop_dir.is_dir():
        raise SystemExit(f"Carpetas no válidas. mobile={mobile_dir} desktop={desktop_dir}")

    print(f"[INFO] Hasheando mobile: {mobile_dir}")
    mobile_hashes = compute_phash_map(mobile_dir)
    print(f"[INFO] Hasheando desktop: {desktop_dir}")
    desktop_hashes = compute_phash_map(desktop_dir)

    # Índice por nombre de archivo (para evitar colisiones en destino)
    mobile_names = {p.name for p in mobile_hashes.keys()}

    # Para asegurar one-to-one, iremos marcando móviles ya usados
    used_mobile = set()

    renames = []  # (src_path, dst_path, distance, matched_mobile)

    # Para cada desktop, encuentra el mobile más cercano
    for dpath, dhash in desktop_hashes.items():
        best = None
        best_dist = 1_000_000
        best_mpath = None

        for mpath, mhash in mobile_hashes.items():
            if mpath in used_mobile:
                continue
            dist = dhash - mhash  # distancia Hamming
            if dist < best_dist:
                best_dist = dist
                best = mhash
                best_mpath = mpath

        if best_mpath is None:
            print(f"[WARN] Sin match para {dpath.name}")
            continue

        if best_dist > args.threshold:
            print(f"[SKIP] {dpath.name} → {best_mpath.name} (dist={best_dist} > threshold={args.threshold})")
            continue

        # Nombre destino propuesto a partir del nombre mobile
        dst_name = propose_desktop_name(best_mpath.name)
        dst_path = desktop_dir / dst_name

        # Evitar sobreescrituras accidentales
        if dst_path.exists() and dst_path.resolve() != dpath.resolve():
            print(f"[WARN] Ya existe destino {dst_name}, omitido {dpath.name}")
            continue

        renames.append((dpath, dst_path, best_dist, best_mpath))
        used_mobile.add(best_mpath)

    # Ejecutar (o simular)
    if not renames:
        print("[INFO] No hay archivos por renombrar.")
        return

    print("\n=== Plan de renombrado ===")
    for src, dst, dist, mpath in renames:
        print(f"{src.name}  ->  {dst.name}   (match: {mpath.name}, dist={dist})")

    if args.dry_run:
        print("\n[DRY-RUN] Simulación completa. No se renombró nada.")
        return

    print("\n[APLICANDO] Renombrando archivos...")
    for src, dst, dist, mpath in renames:
        try:
            os.rename(src, dst)
        except Exception as e:
            print(f"[ERROR] {src.name} -> {dst.name}: {e}")
        else:
            print(f"[OK] {src.name} -> {dst.name}")

    print("\n✅ Listo.")

if __name__ == "__main__":
    main()
