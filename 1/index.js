const http = require('http');
const url = require('url');

let homePageViews = 0;
let aboutPageViews = 0;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === '/') {
    homePageViews += 1;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head>
          <title>Home</title>
        </head>
        <body>
          <h1>Home Page</h1>
          <p>This page has been viewed ${homePageViews} times.</p>
          <a href="/about">Go to About Page</a>
        </body>
      </html>
    `);
    res.end();
  } else if (path === '/about') {
    aboutPageViews += 1;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head>
          <title>About</title>
        </head>
        <body>
          <h1>About Page</h1>
          <p>This page has been viewed ${aboutPageViews} times.</p>
          <a href="/">Go to Home Page</a>
        </body>
      </html>
    `);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head>
          <title>404 Not Found</title>
        </head>
        <body>
          <h1>404 Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <a href="/">Go to Home Page</a>
        </body>
      </html>
    `);
    res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
