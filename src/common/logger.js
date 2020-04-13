const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, json, uncolorize } = format;

const errorPath = path.join(__dirname, '../../logs/', 'error.log');
const infoPath = path.join(__dirname, '../../logs/', 'info.log');
const warnPath = path.join(__dirname, '../../logs/', 'warn.log');

const logger = createLogger({
  defaultMeta: { service: 'express-d90375-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: errorPath,
      level: 'error',
      format: format.combine(format.uncolorize(), format.simple())
    }),
    new transports.File({
      filename: infoPath,
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: warnPath,
      level: 'warn',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

module.exports = logger;
