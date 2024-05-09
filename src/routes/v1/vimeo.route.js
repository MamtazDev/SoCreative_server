const express = require('express');
const { vimeoController } = require('../../controllers');

const router = express.Router();

router.post('/create-video-instant', vimeoController.createVideoInstant);
router.get('/:id', vimeoController.getVideoTranscoding);


module.exports = router;
