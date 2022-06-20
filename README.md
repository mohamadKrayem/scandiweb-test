# Scandiweb test

In this repo, there are 2 folders: "PHP_API" for the server-side, and "react_app" for the client-side.

## PHP_API

In the server-side, I created 3 folders; "config", "objects" and "routes"; and "composer.json" file(for hosting).
queries.sql is an additional file for sql queries.

- config: Dealing with DB connection;
- objects: Contains 3 classes and a single interface, the 3 classes implement the interface Product, and with the interfaces, we can avoid the if-else of switch statement as I did while building this website (Check PHP_API/routes/create.php).
- routes : Contains 3 files; read.php to deal with fetching data, create.php to deal with posting data, delete.php to deal with deleting data;


## react_app

In the frontend I use react, axios, react-router.

## Demo

You can check the demo of [this website](https://react-frontend-jade.vercel.app/);