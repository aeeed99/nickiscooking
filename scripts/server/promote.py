"""
Promote the current staging site to prod.
The variable AWS_S3_BUCKET is the *source* of the website.
AWS_S3_PROD_BUCKET is the *destination*
"""
import os
import json
import subprocess
import logging as log

log.basicConfig(level=os.environ.get("LOGLEVEL", log.INFO))

PROJECT_ROOT = "../.."

with open("../../secrets.json") as fh:
    secrets = json.loads(fh.read())
    log.debug(f"Loaded {len(secrets)} secrets")


def copy_s3_staging_to_s3_prod():
    AWS_S3_BUCKET = os.environ.get("KDB_AWS_S3_BUCKET", secrets["AWS_S3_BUCKET"])
    AWS_S3_PROD_BUCKET = os.environ.get("KDB_AWS_PROD_S3_BUCKET", secrets["AWS_S3_PROD_BUCKET"])
    AWS_S3_CDN_BUCKET = os.environ.get("KDB_AWS_S3_CDN_BUCKET", secrets["AWS_S3_CDN_BUCKET"])

    log.debug(f"will copy assets from {AWS_S3_BUCKET} to {AWS_S3_PROD_BUCKET}")

    cp = subprocess.run(
        ["aws", "s3", "sync", f"s3://{AWS_S3_BUCKET}", f"s3://{AWS_S3_PROD_BUCKET}"],
        cwd=PROJECT_ROOT,
        stdout=subprocess.PIPE,
        check=True,
    )


if __name__ == "__main__":
    try:
        copy_s3_staging_to_s3_prod()
    except subprocess.CalledProcessError as e:
        log.critical("Could not deploy!!")
        log.critical(e.stderr)

