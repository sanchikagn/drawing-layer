# Drawing-Layer

A basic layer of a whiteboard for enabling real-time collaboration. 
This includes a basic Node.js server to serve the layer, and this drawing layer is based on TogetherJS for allowing real-time interaction among peers.
TogetherJS is an open-source JavaScript library by Mozilla (https://togetherjs.com)

Getting Started

To get the Node.js Express server running locally (for initial connection establishment): Run the project by executing 'npm start' inside the project location.
Request the chat feature by 'http://localhost:8083/' in the browser.

Application Structure

    app.js - The entry point to the application.

    package.json - This file provides identifiers for all the npm dependency modules used in the application

    bin/ The basic event listeners for the server

    node_modules/ This directory includes all the npm modlues needed

    public/ This directory for images, stylesheets and javascripts

    routes/ This includes the routes for each request

    views/ The basic view pages
  
