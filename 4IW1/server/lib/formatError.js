module.exports = function formatError(errors) {
  return errors.reduce((acc, error) => {
    acc[error.path] = error.message;
    return acc;
  }, {});
};
