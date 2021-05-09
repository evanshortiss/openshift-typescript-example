import { get } from 'env-var';
import * as pino from 'pino';

const config = {
  PORT: get('PORT').default('8080').asPortNumber(),

  LOG_LEVEL: get('LOG_LEVEL')
    .default('debug')
    .asEnum(Object.keys(pino.levels.values)),

  REDIS_HOST: get('REDIS_HOST').asString(),
  REDIS_PORT: get('REDIS_PORT').default('6379').asPortNumber(),
};

export = config;
