'use strict';

/**
 * Higher-order middleware factory for input validation.
 * @param {Function} validateFn Validation logic function returning array of error messages or empty array
 */
const validate = (validateFn) => {
  return (req, res, next) => {
    const errors = validateFn(req);
    if (errors && errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors[0], // Primary error message
        errors,
      });
    }
    next();
  };
};

module.exports = { validate };
