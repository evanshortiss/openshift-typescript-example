# TypeScript Sample Application

This repository provides a simple starting point for running TypeScript
applications on OpenShift. It can also be applied to applications that use
Babel or other transpilers.

A blogpost that runs through the details of this repository and OpenShift can
be found [here](http://evanshortiss.com/development/openshift/javascript/typescript/2018/02/15/ts-on-openshift.html).

You can use this repository as a template, just click the green "Use this
template" button at the top of this page on GitHub.

## Running on OpenShift via NodeShift
To use this method of deployment you'll need:

* Node.js v12 or later
* OpenShift 4.x (Run OpenShift 4.x locally using [CodeReady Containers](https://developers.redhat.com/products/codeready-containers/overview))

NodeShift is a neat CLI that simplifies deployment of Node.js applications on
OpenShift. This project incldues NodeShift in `devDependencies`.

You can run the following to deploy it on an OpenShift instance:

```
$ git clone git@github.com:evanshortiss/openshift-typescript-example.git ts-openshift

$ cd ts-openshift

# Ensure you are logged into your openshift instance
$ oc login

# Choose the project you'd like to deploy this applicaion into
$ oc new-project ts-example

# Build, deploy, and expose an endpoint for the service
$ npm run nodeshift -- --expose
```

If you're deploying on a locally running instance of OpenShift you might need
to do the following to bypass the self-signed certificate issues:

```
$ npm run nodeshift -- --expose --strictSSL=false
```

## Running Locally without Docker
To run this application locally you'll need:

* Node.js v12 or later
* npm v6 or later
* Git

Exectute the following commands to start the program locally:

```
$ git clone git@github.com:evanshortiss/openshift-typescript-example.git ts-openshift

$ cd ts-openshift

$ npm install

$ npm run build

$ npm start
```

If you're developing locally, start a live reload server like so:

```
npm run start-dev
```

## Running Locally using Docker and s2i
To perform the following steps you'll need:

* [Docker](https://docs.docker.com/release-notes/) (v17.x tested)
* [s2i](https://github.com/openshift/source-to-image/releases) (v1.1.7 tested)

With both tools installed, execute the following commands to run your
application locally. This will create a container that matches the one created
using an OpenShift Build.

```bash
# Upstream builder image
export BASE_IMAGE=centos/nodejs-12-centos7

# Official Red Hat builder image
# You can use this if you have logged in to registry.redhat.io
# export BASE_IMAGE=registry.redhat.io/rhel8/nodejs-12

# Build the latest local commit into a container image. The "--copy" flag
# indicates we build the local source and not remote git origin
$ s2i build --copy . $BASE_IMAGE openshift-ts

# Run our container image
$ docker run -p 8080:8080 -dit --name openshift-ts openshift-ts
```
