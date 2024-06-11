const boomHandler = (err, req, res, next) => {
  const { message = "Oops! Something went wrong", isBoom, output } = err;

  if (isBoom) {
    const { statusCode, payload } = output;
    return res.status(statusCode).json(payload);
  }
  return res.status(500).json({ message });
};

module.exports = { boomHandler };
