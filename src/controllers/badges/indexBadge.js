const indexBadge = (req, res, next) => {
  try {
    res.send("Badges");
  } catch (error) {
    next(error);
  }
};

export { indexBadge };
