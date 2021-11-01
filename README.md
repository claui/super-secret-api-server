# Purpose

This repository contains the API server, which powers the LED Wall.


# Installation

## Installing required software

The following packages need to be installed before you can work on the server:

- Ruby
- Bundler
- jq
- Node.js
- Yarn
- Google Cloud SDK

On macOS, the above requirements can be met using Homebrew.

To install Ruby and Bundler, run the following Bash snippet:

```
(
  set -ex

  brew reinstall rbenv
  rbenv install 2.7.4
  export RBENV_VERSION=2.7.4
  rbenv exec gem update -N --system
)
```

To install jq, Node.js, and Yarn, run:

```
brew reinstall jq node yarn
```

To install the Google Cloud SDK, run:

```
brew cask reinstall google-cloud-sdk
```

## Building the server

After `cd`-ing to the project root, run the following Bash snippet:

```
yarn install && yarn build
```


# Usage

## Running the server

After `cd`-ing to the project root, run the following Bash snippet:

```
yarn serve
```

## Testing the server

For a basic health check, run:

```
curl 'http://localhost:5101/resources.json'
```

If the GCP backend (see section _Deploying to GCP_) is online, you can test the API as follows:

```
curl 'http://localhost:5101/api/wall/v1/negative/phrases'
```

## Deploying to GCP

### Prerequisites

Deploying the app to the Google Cloud Platform (GCP) has the following additional prerequisites:

- You have a GCP project named `ted-merck-wall`. (`gcloud projects create 'ted-merck-wall' --name='LED Wall'`)
- You have enabled the App Engine for `ted-merck-wall`. (`gcloud app create`)
- Your Google account is authorized for App Engine deployment in the `ted-merck-wall` project.
- You have enabled the DataStore API. (`gcloud services enable datastore.googleapis.com`)
- Billing is enabled for the `ted-merck-wall` project.
- You have authenticated the `gcloud` CLI. (`gcloud auth application-default login`)

### Deployment

To deploy the server to the GCP, run the following Bash snippet:

```
(
  set -ex

  cd build/server
  gcloud app deploy --no-promote --project='ted-merck-wall'
)
```

### Promoting

If you have tested the new deployment, you can then use the Cloud Console to promote the deployed app so it will receive traffic.

### Viewing server logs

To view (tail) server logs, run:

```
gcloud app logs tail -s default --project='ted-merck-wall'
```


## Browser URLs

- https://ted-merck-wall.appspot.com/wall/negative/

- https://ted-merck-wall.appspot.com/wall/positive/

- https://ted-merck-wall.appspot.com/kiosk/negative/

- https://ted-merck-wall.appspot.com/kiosk/positive/



# Maintenance

## Generating server stubs from scratch

Regenerating the server stubs is usually not necessary.

If you still want to do it, the following Bash snippet generates the stubs.

Wall:

```
(
  set -ex

  yarn install
  yarn trash build/server

  yarn openapi-generator generate \
    -g ruby-sinatra \
    -i src/openapi/wall.json \
    -o build/server

  cd build/server

  bundle config --local allow_offline_install true
  bundle config --local path vendor/bundle
)
```

Kiosk:

```
(
  set -ex

  yarn install
  yarn trash build/server

  yarn openapi-generator generate \
    -g ruby-sinatra \
    -i src/openapi/kiosk.json \
    -o build/server

  cd build/server

  bundle config --local allow_offline_install true
  bundle config --local path vendor/bundle
)
```

## Exporting all phrases

To export all phrases from a running instance, run the following Bash snippet:

```
(
  set -eu
  API_HOST='https://ted-merck-wall.appspot.com'
  TARGET_DIR='api-dumped'

  for namespace in negative positive; do
    mkdir -p "${TARGET_DIR}/wall/v1/${namespace}"
    curl -sS "${API_HOST}/api/wall/v1/${namespace}/phrases" \
      | jq . > "${TARGET_DIR}/wall/v1/${namespace}/phrases.json"
  done
)
```
