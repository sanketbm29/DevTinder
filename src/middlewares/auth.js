const adminAuth = (req, res, next) => {
  console.log("Admin auth getting checked.");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

module.exports = { adminAuth };
