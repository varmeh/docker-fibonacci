## Description

This app takes an index from user & displays corresponding fibonacci value

## Components

-   Nginx - Web Server
    -   Acts as interface to web
    -   Internally connected to client & server apps running in different containers
    -   Internally acts as Router. Routes traffic based on url
        -   **/api/\*** routed to server app
        -   **/\*** routed to client app
-   Client App - React App hosted on port 3000
-   Server App - Express Server hosted on port 5000
    -   Server listens to request from React App
    -   Server app first save input in a _Postgresql_ database
    -   Then it stores the value in _Redis_ & initiate the worker thread to calculate the corresponding fibonacci value
-   Worker - Calculates fibonacci value at an index

## Dockerfile Composition

-   Dockerfile.dev
    -   Development Env Configuration
    -   Uses Docker Volumes to avoid reloading during development
