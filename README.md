# Album Creator

This project allows users to create and manage music albums and tracks within a web application.

## Features

* **Album Management**
  * Create new albums with names
  * View a list of all created albums
  * Display details of individual albums, including track lists
  * Delete entire albums (cascading to delete associated tracks)

* **Track Management**
  * Create new music tracks (including name, artist, and genre)
  * Add existing tracks to albums
  * Delete individual or multiple tracks from an album

## Technologies

* **Frontend:**
  * ReactJS
* **Backend:**
  * Node.js
  * Express
* **Database:**
  * Postgres

## Setup Instructions

**Prerequisites**

* Node.js and npm (or yarn)
* Docker
* Docker Compose

**Installation**

1. Clone the repository:
    ```bash
    git clone https://github.com/youngman3009/AlbumCreator.git
2. Create a `.env` file in the root of the project with the following values:
    * POSTGRES_DB=_Database name_
    * POSTGRES_USER=_Database user to use_
    * POSTGRES_PASSWORD=_Database password to use_
    * POSTGRES_PORT=_Port database should run on externally_
    * POSTGRES_HOST=_Address Postgres is accessible from_
    * FRONTEND_PORT=_Port frontend service should run on externally_
    * BACKEND_PORT=_Port backend service should run on externally_
    * BACKEND_SERVICE=backend
    * FRONTEND_SERVICE=frontend
    * POSTGRES_SERVICE=postgres
3. Run the docker containers:
    ```bash
    docker compose up -d
4. Access the website via Nginx in a browser on port 80/443

**Notes**

* All API endpoints should start with /api
* View the API documentation at `/api/docs`
