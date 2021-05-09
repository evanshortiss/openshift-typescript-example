#!/usr/bin/env bash

IMAGE_REPOSITORY=${IMAGE_REPOSITORY:-quay.io/evanshortiss/openshift-s2i-typescript-example:latest}

rm -rf node_modules/

s2i build -e HUSKY_SKIP_INSTALL=1 -c . registry.access.redhat.com/ubi8/nodejs-12 ${IMAGE_REPOSITORY}
