import express from 'express';
import * as path from 'path';
import { PORT } from './config';
import { getViewCount } from './redis';
import log from './log';

const app = express();

// Add kubernetes liveness and readiness probes at
// /api/health/readiness and /api/health/liveness
require('kube-probe')(app);

// Include sensible security headers by default
app.use(require('helmet')());
// Log incoming requests
app.use(require('morgan')('combined'));

// Respond with an index.html file for the default route
app.get('/', async (req: express.Request, res: express.Response) => {
  // Include a view count header if Redis is connected
  const viewCount = await getViewCount();
  res.setHeader('x-view-count', viewCount ? viewCount : 'cache unavailable');

  res.sendFile(path.resolve('./views/index.html'));
});

// Our "Hello, World" endpoint. Can be passed a querystring "name" parameter
app.get('/api/hello', (req: express.Request, res: express.Response) => {
  const name = req.query.name || 'World';
  const message = `Hello, ${name}!`;

  log.debug(`returning message: "${message}"`);

  res.json({
    message,
  });
});

app.listen(PORT, () => {
  log.info(`🚀 server listening on port ${PORT}`);
});
