# Purpose

This repository contains the API server, which powers the LED Wall.


# Installation

## Installing required software

The following packages need to be installed before you can work on the server:

- Ruby
- Bundler
- Node.js
- Yarn
- Google Cloud SDK

On macOS, the above requirements can be met using Homebrew.

To install Ruby and Bundler, run the following Bash snippet:

```
(
  set -ex

  brew reinstall rbenv rbenv-aliases
  rbenv install 2.5.3
  rbenv alias --auto
  RBENV_VERSION=2.5 rbenv exec gem install bundler
)
```

To install Node.js and Yarn, run:

```
brew reinstall node yarn
```

To install the Google Cloud SDK, run:

```
brew cask reinstall google-cloud-sdk
```

## Preparing the server

After `cd`-ing to the project root, run the following Bash snippet:

```
(
  set -e

  cd build/server
  rbenv exec bundle install
)
```


# Usage

## Running the server

After `cd`-ing to the project root, run the following Bash snippet:

```
(
  set -e

  cd build/server
  rbenv exec bundle exec rackup -p 5101 config.ru
)
```

## Testing the server

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
- You have authenticated the `gcloud` CLI. (`gcloud auth login`)

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


# Maintenance

## Generating server stubs from scratch

Regenerating the server stubs is usually not necessary.

If you still want to do it, the following Bash snippet generates the stubs:

```
(
  set -ex

  yarn install
  trash build/server || true

  yarn openapi-generator generate \
    -g ruby-sinatra \
    -i src/openapi/wall.json \
    -o build/server

  cd build/server

  bundle config --local allow_offline_install true
  bundle config --local path vendor/bundle
)
```
