class ValidationError extends Error {
  constructor(statusCode, message, statusName) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.statusName = statusName;
  }
}

module.exports = {
  ValidationError
};
