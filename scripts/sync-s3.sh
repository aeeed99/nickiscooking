#!/usr/bin/env bash
set -eou pipefail

aws s3 sync data/recipes s3://${1}