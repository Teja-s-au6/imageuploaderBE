const { Router } = require("express");
const router = Router();
const authenticate = require('../middlewares/authenticate');
const upload = require("../utils/multer");

const {imgupload, addfavourites, deletefavourites, getimgupload, allimgupload} = require("../controllers/apiController");

router.post("/user/create/:token", authenticate, upload.single("file"), imgupload);

router.post("/user/favourites/:id&:token", authenticate, addfavourites);

router.delete("/user/delete/favourites/:token", authenticate, deletefavourites);

router.get("/imageuploaders", allimgupload);

router.get("/user/imagesuploads/:token", authenticate, getimgupload);

module.exports = router;