const express = require('express');
// const { isAuth } = require('../../middlewares/testAuth');
const { brandKitController } = require('../../controllers');

const router = express.Router();

// isAuth - middleware is required here

router.post('/', brandKitController.createBrandKit);
router.get('/', brandKitController.getAllBrandKits);
router.get('/:id', brandKitController.getBrandKitInfo);
router.patch('/:id', brandKitController.updateBrandKit);
router.delete('/:id', brandKitController.deleteBrandKit);


module.exports = router;
