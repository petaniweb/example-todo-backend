const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

// Read all files in the routes folder
fs.readdirSync(__dirname).forEach(file => {
  // Exclude index.js file itself
  if (file !== 'index.js') {
    // Resolve the full path of the file
    const routePath = path.join(__dirname, file);
    
    // Import the route handler
    const route = require(routePath);
    
    // Extract the base route path from the file name
    const baseRoute = '/' + file.split('.')[0];
    
    // Mount the route
    router.use(baseRoute, route);
  }
});

module.exports = router;