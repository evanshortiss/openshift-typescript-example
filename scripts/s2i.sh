#!/usr/bin/env bash

IMAGE_REPOSITORY=${IMAGE_REPOSITORY:-quay.io/evanshortiss/openshift-s2i-typescript-example:latest}

# Don't want to copy in local node_modules to the build
rm -rf node_modules/

# Build local codebase using source-to-image. Skip the husky hooks
# installation using env vars. Use red hat ubi8 nodejs 12 as the base
# image and tag using the given tag name
s2i build -c . \
-e HUSKY_SKIP_INSTALL=1 \
registry.access.redhat.com/ubi8/nodejs-12 ${IMAGE_REPOSITORY}
