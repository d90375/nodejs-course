const path = require('path');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { service: 'express-d90375-service' },
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../../logs/', 'error.json'),
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: path.join(__dirname, '../../logs/', 'info.json'),
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: path.join(__dirname, '../../logs/', 'warn.json'),
      level: 'warn'
    })
  ]
});

module.exports = logger;
