export function isAdmin(req, res, next) {
  if (req.APP_DATA.tokenDecode.userLevel === 0) {
    next();
  }
  else {
    res.json({
      message: "Halaman ini diakses oleh admin",
    });
  }
}
export function isCostumer(req, res, next) {
  if (req.APP_DATA.tokenDecode.userLevel === 1) {
    next();
  }
  else {
    res.json({
      message: "Halaman ini diakses oleh costumer"
    });
  }
}