"""
Image optimizer for Ashton Vale Archives
- Converts non-transparent PNGs to JPEG (massive size reduction for photos)
- Keeps PNG only where transparency is actually used
- Auto-updates all references in data/songs/*.js and case.html
- Backs up originals to images/_originals/ first

Run: python optimize-images.py
"""

import io
import re
import shutil
from pathlib import Path
from PIL import Image

SITE_DIR   = Path(__file__).parent
IMAGES_DIR = SITE_DIR / "images"
BACKUP_DIR = IMAGES_DIR / "_originals"
SONGS_DIR  = SITE_DIR / "data" / "songs"

MAX_DIM      = 1600   # resize if wider or taller than this
JPEG_QUALITY = 82     # 75-85 is visually indistinguishable for photos
SKIP_DIRS    = {"_originals"}

# Files/folders to always keep as PNG (UI elements, logos, icons)
KEEP_PNG_NAMES = {"tape.png", "About.png", "Archives.png", "Cabinet.png",
                  "Case.png", "Classified.png", "Completed.png",
                  "Evidence.png", "Join.png", "Progress.png", "Sounds.png"}


def fmt(b):
    if b >= 1_000_000_000: return f"{b/1e9:.2f} GB"
    if b >= 1_000_000:     return f"{b/1e6:.1f} MB"
    return f"{b/1000:.1f} KB"


def collect(root):
    for p in sorted(root.rglob("*.png")):
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        yield p


def backup(src):
    dst = BACKUP_DIR / src.relative_to(IMAGES_DIR)
    dst.parent.mkdir(parents=True, exist_ok=True)
    if not dst.exists():
        shutil.copy2(src, dst)


def has_transparency(img):
    if img.mode == "RGBA":
        import numpy as np
        return int(np.array(img)[:, :, 3].min()) < 255
    if img.mode == "P" and "transparency" in img.info:
        return True
    return False


def optimize_png(img):
    """Best lossless PNG compression."""
    candidates = []
    for colors in [256, 128]:
        if img.mode in ("RGB", "L"):
            q = img.quantize(colors=colors, method=Image.Quantize.MEDIANCUT)
            buf = io.BytesIO()
            q.save(buf, "PNG", optimize=True, compress_level=9)
            candidates.append(buf.getvalue())
    buf = io.BytesIO()
    img.save(buf, "PNG", optimize=True, compress_level=9)
    candidates.append(buf.getvalue())
    return min(candidates, key=len)


def process(path):
    """
    Returns (original_size, new_size, new_path)
    new_path == path if extension unchanged, else new .jpg path
    """
    original_size = path.stat().st_size
    backup(path)

    img = Image.open(path)
    if img.mode == "P":
        img = img.convert("RGBA" if "transparency" in img.info else "RGB")

    # Resize
    if max(img.size) > MAX_DIM:
        img = img.copy()
        img.thumbnail((MAX_DIM, MAX_DIM), Image.LANCZOS)

    keep_as_png = path.name in KEEP_PNG_NAMES

    if not keep_as_png and not has_transparency(img):
        # Convert to JPEG
        if img.mode in ("RGBA", "P", "LA"):
            img = img.convert("RGB")
        elif img.mode not in ("RGB", "L"):
            img = img.convert("RGB")

        jpg_path = path.with_suffix(".jpg")
        img.save(jpg_path, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        new_size = jpg_path.stat().st_size

        if new_size < original_size:
            path.unlink()          # remove old .png
            return original_size, new_size, jpg_path
        else:
            jpg_path.unlink()      # jpeg wasn't smaller, keep png
            new_data = optimize_png(img)
            if len(new_data) < original_size:
                path.write_bytes(new_data)
                return original_size, len(new_data), path
            return original_size, original_size, path

    else:
        # Keep PNG, just compress better
        new_data = optimize_png(img)
        if len(new_data) < original_size:
            path.write_bytes(new_data)
            return original_size, len(new_data), path
        return original_size, original_size, path


def update_references(renames: dict):
    """
    renames: {old_relative_path: new_relative_path}
    e.g. {"images/Objects/001 - X.png": "images/Objects/001 - X.jpg"}
    Updates all .js and .html files under SITE_DIR.
    """
    if not renames:
        return

    files_to_scan = list(SITE_DIR.rglob("*.js")) + list(SITE_DIR.rglob("*.html"))
    # Exclude node_modules, _originals
    files_to_scan = [f for f in files_to_scan
                     if "_originals" not in f.parts and "node_modules" not in f.parts]

    updated_files = 0
    for fpath in files_to_scan:
        try:
            text = fpath.read_text(encoding="utf-8")
            new_text = text
            for old, new in renames.items():
                new_text = new_text.replace(old, new)
                # Also handle forward/back slash variants
                new_text = new_text.replace(old.replace("/", "\\"), new.replace("/", "\\"))
            if new_text != text:
                fpath.write_text(new_text, encoding="utf-8")
                updated_files += 1
                print(f"  Updated refs in: {fpath.relative_to(SITE_DIR)}")
        except Exception as e:
            print(f"  Could not update {fpath}: {e}")

    print(f"  {updated_files} files had references updated.")


def main():
    try:
        import numpy  # noqa
    except ImportError:
        print("Installing numpy for alpha detection...")
        import subprocess, sys
        subprocess.check_call([sys.executable, "-m", "pip", "install", "numpy", "-q"])

    images = list(collect(IMAGES_DIR))
    print(f"Found {len(images)} PNGs\n")

    total_before = total_after = skipped = converted = 0
    renames = {}

    for i, path in enumerate(images, 1):
        rel = path.relative_to(IMAGES_DIR)
        try:
            before, after, new_path = process(path)
            total_before += before
            total_after  += after
            saved = before - after
            pct   = saved / before * 100 if before else 0

            if new_path != path:
                old_rel = "images/" + str(path.relative_to(IMAGES_DIR)).replace("\\", "/")
                new_rel = "images/" + str(new_path.relative_to(IMAGES_DIR)).replace("\\", "/")
                renames[old_rel] = new_rel
                converted += 1
                print(f"[{i}/{len(images)}] {rel}  → .jpg  {fmt(before)} → {fmt(after)}  (-{pct:.0f}%)")
            elif saved > 0:
                print(f"[{i}/{len(images)}] {rel}  {fmt(before)} → {fmt(after)}  (-{pct:.0f}%)")
            else:
                skipped += 1

        except Exception as e:
            total_before += path.stat().st_size
            total_after  += path.stat().st_size
            print(f"[{i}/{len(images)}] ERROR {rel}: {e}")

    print(f"\nUpdating file references for {len(renames)} renamed files...")
    update_references(renames)

    saved_total = total_before - total_after
    print(f"\n{'='*60}")
    print(f"Before    : {fmt(total_before)}")
    print(f"After     : {fmt(total_after)}")
    print(f"Saved     : {fmt(saved_total)}  ({saved_total/total_before*100:.1f}%)")
    print(f"PNG→JPEG  : {converted} files converted")
    print(f"Skipped   : {skipped} already optimal")
    print(f"Originals : {BACKUP_DIR}")


if __name__ == "__main__":
    main()
