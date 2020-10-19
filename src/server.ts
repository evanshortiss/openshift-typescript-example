import * as express from 'express';
import * as env from 'env-var';
import * as pino from 'pino';
import * as path from 'path';

const PORT = env
  .get('PORT')
  .default('8080')
  .asPortNumber();
const LOG_LEVEL = env
  .get('LOG_LEVEL')
  .default('debug')
  .asEnum(Object.keys(pino.levels.values));

const log = pino({
  level: LOG_LEVEL
});

const app = express();

// Add kubernetes liveness and readiness probes at
// /api/health/readiness and /api/health/liveness
require('kube-probe')(app);

// Include sensible security headers by default
app.use(require('helmet')());
// Log incoming requests
app.use(require('morgan')('combined'));

// Respond with an index.html file for the default route
app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve('./views/index.html'));
});

// Our "Hello, World" endpoint. Can be passed a querystring "name" parameter
app.get('/api/hello', (req: express.Request, res: express.Response) => {
  const name = req.query.name || 'World';
  const message = `Hello, ${name}!`;

  log.debug(`returing message "${message}"`);

  res.json({
    message
  });
});

app.listen(PORT, (err: any) => {
  log.info(`🚀 server listening on port ${PORT}`);
});
