class ValidationError extends Error {
  constructor(statusCode, message, status) {
    super();
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = {
  ValidationError
};
