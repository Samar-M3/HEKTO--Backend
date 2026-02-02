const checkFiles = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
    req.body.publicId = req.file.filename;
    return next();
  }

  if (req.files && req.files.length > 0) {
    req.body.images = [];
    req.body.publicIds = [];
    for (const file of req.files) {
      req.body.images.push(file.path);
      req.body.publicIds.push(file.filename);
    }
    return next();
  }
  next();
};

module.exports = checkFiles;
