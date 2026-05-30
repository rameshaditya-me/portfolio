#!/usr/bin/env python3
"""
Center-crop and resize all project-unsplash-* images to one square size.

Usage (from repo root):
  pip install Pillow   # once
  python3 scripts/crop-project-images.py
  python3 scripts/crop-project-images.py --size 987 --dry-run
  python3 scripts/crop-project-images.py --backup   # keep .bak copies first
"""

from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required. Install with: pip install Pillow")

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_FIGURES_DIR = REPO_ROOT / "assets" / "figures"
DEFAULT_SIZE = 800
DEFAULT_QUALITY = 90
GLOB_PATTERN = "project-unsplash-*"


def crop_center_square(img: Image.Image) -> Image.Image:
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    return img.crop((left, top, left + side, top + side))


def to_rgb(img: Image.Image) -> Image.Image:
    if img.mode in ("RGB", "L"):
        return img
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        background = Image.new("RGB", img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
        return background
    return img.convert("RGB")


def find_images(directory: Path) -> list[Path]:
    files = sorted(
        p
        for p in directory.glob(GLOB_PATTERN)
        if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
    )
    return files


def process_file(
    path: Path,
    size: int,
    quality: int,
    backup: bool,
    dry_run: bool,
) -> None:
    with Image.open(path) as opened:
        original_size = opened.size
        img = to_rgb(opened)
        square = crop_center_square(img)
        resized = square.resize((size, size), Image.Resampling.LANCZOS)

    if dry_run:
        print(f"[dry-run] {path.name}: {original_size[0]}×{original_size[1]} → {size}×{size}")
        return

    if backup:
        backup_path = path.with_suffix(path.suffix + ".bak")
        if not backup_path.exists():
            shutil.copy2(path, backup_path)
            print(f"backup: {backup_path.name}")

    save_kwargs = {"quality": quality, "optimize": True}
    if path.suffix.lower() in {".jpg", ".jpeg"}:
        resized.save(path, "JPEG", **save_kwargs)
    elif path.suffix.lower() == ".png":
        resized.save(path, "PNG", optimize=True)
    else:
        resized.save(path, **save_kwargs)

    print(f"{path.name}: {original_size[0]}×{original_size[1]} → {size}×{size}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Center-crop project-unsplash-* images to a uniform square size."
    )
    parser.add_argument(
        "--dir",
        type=Path,
        default=DEFAULT_FIGURES_DIR,
        help=f"Directory with images (default: {DEFAULT_FIGURES_DIR})",
    )
    parser.add_argument(
        "--size",
        type=int,
        default=DEFAULT_SIZE,
        help=f"Output width and height in pixels (default: {DEFAULT_SIZE})",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=DEFAULT_QUALITY,
        help=f"JPEG quality 1–100 (default: {DEFAULT_QUALITY})",
    )
    parser.add_argument(
        "--backup",
        action="store_true",
        help="Save originals as *.bak before overwriting",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print planned changes without writing files",
    )
    args = parser.parse_args()

    if args.size < 1:
        parser.error("--size must be at least 1")

    figures_dir = args.dir.resolve()
    if not figures_dir.is_dir():
        sys.exit(f"Directory not found: {figures_dir}")

    images = find_images(figures_dir)
    if not images:
        sys.exit(f"No files matching {GLOB_PATTERN} in {figures_dir}")

    print(f"Processing {len(images)} image(s) → {args.size}×{args.size}px")
    for path in images:
        process_file(path, args.size, args.quality, args.backup, args.dry_run)

    print("Done.")


if __name__ == "__main__":
    main()
