// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 443;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: ["https://repl.it/@splch/daily-paper", "https://daily-paper.splch.repl.co"], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: [
      'cookie',
      'cookie2',
      // Strip Heroku-specific headers
      'x-heroku-queue-wait-time',
      'x-heroku-queue-depth',
      'x-heroku-dynos-in-use',
      'x-request-start',
    ],
    redirectSameOrigin: true,
    httpProxyOptions: {
      // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
      xfwd: false,
    },
  }).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  });
  