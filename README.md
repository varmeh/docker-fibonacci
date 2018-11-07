## Description

This app takes an index from user & displays corresponding fibonacci value

## Components

-   **Client App** - React App
-   **Server App** - Express Server
    -   Server listens to request from React App
    -   Server app first save input in a **Postgresql** database
    -   Then it stores the value in **Redis** & initiate the worker thread to calculate the corresponding fibonacci value
-   **Worker** - Calculates fibonacci value at an index
