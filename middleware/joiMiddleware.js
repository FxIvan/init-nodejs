const joiValidation = (schema) => {
  return function (req, res, next) {
    const options = {
      abortEarly: false,
    };

    const { error } = schema.validate(req.body, options);

    if (error) {
      const errors = error.details.map((item) => item.message);
      /* Format errors as string divided by space */
      const errorString = errors.join("\n");
      return res.status(400).json({ message: errorString });
    } else {
      next();
    }
  };
};

module.exports = {
  joiValidation,
};
