const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, json, uncolorize } = format;

const errorPath = path.join(__dirname, '../../logs/', 'error.json');
const infoPath = path.join(__dirname, '../../logs/', 'info.json');
const warnPath = path.join(__dirname, '../../logs/', 'warn.json');
const exceptionPath = path.join(__dirname, '../../logs/', 'exception.json');

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    errors({ stack: true }),
    json()
  ),
  defaultMeta: { service: 'express-d90375-service' },
  transports: [
    new transports.File({
      filename: errorPath,
      level: 'error'
    }),
    new transports.File({
      filename: infoPath,
      level: 'info'
    }),
    new transports.File({
      filename: warnPath,
      level: 'warn'
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: exceptionPath,
      format: combine(uncolorize(), json())
    })
  ]
});

module.exports = logger;
