## Description

This app takes an index from user & displays corresponding fibonacci value

## Components

- Nginx - Web Server
  - Acts as interface to web
  - Internally connected to client & server apps running in different containers
  - Internally acts as Router. Routes traffic based on url
    - **/api/\*** routed to server app
    - **/\*** routed to client app
- Client App - React App hosted on port 3000
- Server App - Express Server hosted on port 5000
  - Server listens to request from React App
  - Server app first save input in a _Postgresql_ database
  - Then it stores the value in _Redis_ & initiate the worker thread to calculate the corresponding fibonacci value
- Worker - Calculates fibonacci value at an index

## Dockerfile Composition

- Dockerfile.dev
  - Development Env Configuration
  - Uses Docker Volumes to avoid reloading during development

## Running with Docker - Compose

_Docker-Compose_ is used to create development environments with all networking configured.

To start docker compose, use

```
docker-compose up
```

## Running application with K8s

Command to run k8s

```
cd fibonacci/k8s
kubectl apply -f . --recursive
```

You would need postgres password. This needs to be stored in a _k8s secret object_ named _pgpassword_ & password value should be stored in key _POSTGRES_PASSWORD_. Use following command to create this secret:

```
kubectl create secret generic pgpassword --from-literal POSTGRES_PASSWORD=password
```
