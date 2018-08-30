# TypeScript Sample Application

This repository provides a simple starting point for running TypeScript
applications on OpenShift. It can also be applied to applications that use Babel
or other transpilers. A blogpost that runs through the details of this
repository and OpenShift can be found [here](http://evanshortiss.com/development/openshift/javascript/typescript/2018/02/15/ts-on-openshift.html).

## Running on OpenShift via Nodeshift
To use this method of deployment you'll need:

* Node.js v8 or later
* An OpenShift instance via:
  * [OpenShift Online Free Tier](https://www.openshift.com/)
  * [OpenShift Origin](https://github.com/openshift/origin#getting-started)

Nodeshift is a neat CLI that simplifies deployment of Node.js applications on
OpenShift. This project incldues Nodeshift in `devDependencies` so you can
simply run the following to deploy it on an OpenShift instance:

```
$ git clone git@github.com:evanshortiss/openshift-typescript-example.git ts-openshift

$ cd ts-openshift

# Ensure you are logged into your openshift instance
$ oc login

# Choose the project you'd like to deploy this applicaion into
$ oc project myproject

# Build and deploy
$ npm run nodeshift -- --expose
```

If you're deploying on a locally running instance of OpenShift you might need
to do the following to bypass the self-signed certificate issues:

```
$ npm run nodeshift -- --expose --strictSSL=false
```

## Running Locally without Docker
To run this application locally you'll need:

* Node.js v6 or later
* npm v3 or later
* Git

Exectute the following commands to start the program locally:

```
$ git clone git@github.com:evanshortiss/openshift-typescript-example.git ts-openshift

$ cd ts-openshift

$ npm install

$ npm run build

$ npm start
```

If you're developing locally you automated code watching and reloading via:

```
npm run start-dev
```

## Running Locally using Docker and s2i
To perform the following steps you'll need:

* [Docker](https://docs.docker.com/release-notes/) (v17.x tested)
* [s2i](https://github.com/openshift/source-to-image/releases) (v1.1.7 tested)

With both tools installed you can execute the following commands to run your
application locally in an environment that matches that it will use when
deployed on  OpenShift Online.

```
# Build the latest local commit into a container image
# If you have uncommitted changes add the "--copy" flag
$ s2i build . registry.access.redhat.com/rhscl/nodejs-8-rhel7 openshift-ts

# Run our container image
$ docker run -p 8080:8080 -dit --name openshift-ts openshift-ts
```

This instructs `s2i` to build our source code into an image that will be tagged
as "openshift-ts". The base image used the official Red Hat Node.js v6 image.
Once the build is complete we run it using Docker and expose its port 8080 to
our local port 8080.
