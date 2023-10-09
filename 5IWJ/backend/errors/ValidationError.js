class ValidationError extends Error {
  constructor(errors) {
    super("Validation Error");
    this.errors = errors;
    this.name = "ValidationError";
  }
}

ValidationError.fromSequelize = function (SequelizeValidationError) {
  const errors = SequelizeValidationError.errors.reduce((acc, error) => {
    if (error.path in acc) {
      acc[error.path].push(error.message);
    } else {
      acc[error.path] = [error.message];
    }

    return acc;
  }, {});

  return new ValidationError(errors);
};

ValidationError.fromMongoose = function (MongooseValidationError) {};

module.exports = ValidationError;