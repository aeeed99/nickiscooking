
#!/bin/bash

set -i
source .env

hugo
./pagefind --source public

aws s3 sync public s3://${AWS_S3_BUCKET} --exclude 'images/*' --exclude 'bootstrap-5.3.0/*'
aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths '/index.html'