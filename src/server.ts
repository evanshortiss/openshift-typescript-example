import * as express from 'express'
import * as env from 'env-var'
import * as pino from 'pino'

const PORT = env.get('PORT', '3030').asIntPositive()
const LOG_LEVEL = env.get('LOG_LEVEL', 'debug').asString()

const log = pino({
  level: LOG_LEVEL
})

const app = express()

// Include sensible security headers by default
app.use(require('helmet')())

// Our "Hello, World" endpoint. Can be passed a querystring "name" parameter
app.get('/', (req, res) => {
  const name = req.query.name || 'World'
  const message = `Dia dhuit, ${name}!`

  log.debug(`returing message "${message}"`)

  res.json({
    message
  })
})

// Support for health probes. Just return a "200 OK"
app.get('/health', (req, res) => {
  log.debug('responding to health probe')
  res.end('ok')
})

app.listen(PORT, (err: any) => {
  if (err) {
    log.error('serve error', err)
    throw err;
  }

  log.info(`server listening on port ${PORT}`)
})
