const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');

const app = express();
const port = 3001; // You can choose a port of your preference

// Create a proxy server instance
const proxy = httpProxy.createProxyServer();

app.use(cors());

// Define a route on your proxy server
app.all('/api/*', (req, res) => {
  // Define the target URL for your API
  const apiTarget = 'http://challenge.mikigi.com:3099'; // Replace with the external API URL

  // Proxy the request to the external API
  proxy.web(req, res, { target: apiTarget });
});

// Start the proxy server
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
