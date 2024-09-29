#!/usr/bin/env bash
set -eou pipefail
source ../.env
aws s3 sync data/recipes s3://${S3_RECIPE_DATA} 