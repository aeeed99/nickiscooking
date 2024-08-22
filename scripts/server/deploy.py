"""
Builds and deploys the site.
"""
import os
import json
import logging as log
from re import sub
from recibundler.build_recipes import build as r_build_recipes
import create_thumbnails
import subprocess

log.basicConfig(level=os.environ.get("LOGLEVEL", log.INFO))

PROJECT_ROOT = "../.."

with open("../../secrets.json") as fh:
    secrets = json.loads(fh.read())
    log.debug(f"Loaded {len(secrets)} secrets")


def deploy(clean=True):
    if clean:
        build_recipes()
    build_hugo()
    add_pagefind()
    upload_to_s3()
    sync_recipes()

def build_recipes():
    """builds the recipes from the data/json files into hugo content"""
    log.info("building recipes...")
    r_build_recipes()
    log.info("building recipes DONE")


def build_hugo():
    log.info("calling `hugo -DF` to build hugo..")
    os.environ["HUGO_ENV"] = "production"
    subprocess.run(
        ["hugo", "-DF", "--environment", "production"], cwd=PROJECT_ROOT, check=True,
    )
    log.info("hugo build DONE")


def add_pagefind():
    if not os.path.exists(os.path.join(PROJECT_ROOT, "pagefind")):
        log.info("downloading pagefind binary...")
        subprocess.run(["get_pagefind"], check=True)
        log.info("downloading pagefind DONE")
    log.info("adding pagefind for serach...")
    subprocess.run(
        [os.path.join("./pagefind"), "--source", "public"], cwd=PROJECT_ROOT, check=True
    )
    log.info("adding pagefind for search DONE")

def sync_recipes():
    AWS_S3_BUCKET = os.environ.get("KDB_RECIPE_AWS_S3_BUCKET", secrets["AWS_RECIPE_S3_BUCKET"])
    subprocess.run(
        ["aws", "s3", "sync", "data/recipes", f"s3://{AWS_S3_BUCKET}"],
        cwd=PROJECT_ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=True,
    )

def upload_to_s3():
    AWS_S3_BUCKET = os.environ.get("KDB_AWS_S3_BUCKET", secrets["AWS_S3_BUCKET"])
    AWS_S3_CDN_BUCKET = os.environ.get("KDB_AWS_S3_CDN_BUCKET", secrets["AWS_S3_CDN_BUCKET"])

    if AWS_S3_BUCKET == AWS_S3_CDN_BUCKET:
        log.error("values AWS_S3_BUCKET and AWS_S3_CDN should not match! Not deploying")
        return

    log.info("Creating thumbnails")
    create_thumbnails.create()
    log.info("done")

    log.debug(f"will deploy to {AWS_S3_BUCKET}")
    log.info("uploading to s3...")
    cp = subprocess.run(
        ["aws", "s3", "cp", "public", f"s3://{AWS_S3_BUCKET}", "--recursive", "--exclude", '"images/*"' ],
        cwd=PROJECT_ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=True,
    )
    log.info(str(cp.stdout))
    log.info("uploading to s3 DONE")
    log.info("uploading images to cdn")
    cp = subprocess.run(
        ["aws", "s3", "sync", "static", f"s3://{AWS_S3_CDN_BUCKET}"],
        cwd=PROJECT_ROOT,
        stdout=subprocess.PIPE,
        check=True,
    )


if __name__ == "__main__":
    try:
        deploy(clean=False)
    except subprocess.CalledProcessError as e:
        log.critical("Could not deploy!!")
        log.critical(e.stderr)
