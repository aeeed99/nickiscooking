"""
compresses all images in /static/images/* and adds them to 
/static/images/thumbnail/*
"""
from PIL import Image
import os
import sys

PROJECT_ROOT = "../.."
IMAGE_DIR = "static/images"


def convert(overwrite=False):
    for file in os.listdir(os.path.join(PROJECT_ROOT, IMAGE_DIR)):
        if file == "thumbnail":
            continue

        if file.endswith('.webp'):
            continue

        im = Image.open(os.path.join(PROJECT_ROOT, IMAGE_DIR, file))
        filesize = os.path.getsize(im.filename)

        if filesize > 10_000_000:
            quality = 40
        elif filesize > 5_000_000:
            quality = 50
        elif filesize > 1_000_000:
            quality = 60
        elif filesize > 500_000:
            quality = 70
        elif filesize > 200_000:
            quality = 80
        else:
            quality = 100

        root, *_ = os.path.splitext(file)
        outfile = f'{root}.webp'
        outpath = os.path.join(PROJECT_ROOT, IMAGE_DIR, outfile)
        im.save(outpath, 'webp', quality=quality)

        outsize = os.path.getsize(outpath)
        print(f'* new file [{outfile}] In size: {filesize} Out size: {outsize} <quality={quality}>')
        os.unlink(os.path.join(PROJECT_ROOT, IMAGE_DIR, file))


if __name__ == "__main__":
    convert(overwrite=len(sys.argv) > 1)
