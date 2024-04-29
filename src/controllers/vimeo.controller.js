const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');

const accessToken = config.vimeoAccessToken;

const createVideoInstant = catchAsync(async (req, res) => {
  const size = req.body.size;

  const response = await fetch('https://api.vimeo.com/me/videos', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.vimeo.video;version=3.4',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      upload: {
        approach: 'tus',
        size: size,
      },
    }),
  });

  const result = await response.json();

  // console.log(result);

  res.status(httpStatus.OK).send({
    message: 'Vimeo video instant created successfully!',
    success: true,
    data: {
      link: result.link,
      player_embed_url: result.player_embed_url,
      upload_link: result.upload.upload_link,
      status: result.upload.status,
      size: result.upload.size,
    },
  });
});

const getVideoTranscoding = catchAsync(async (req, res) => {
  const id = req.params.id;

  const response = await fetch(`https://api.vimeo.com/me/videos/${id}?fields=${req.query.fields}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.vimeo.video;version=3.4',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  //   console.log(result);

  res.status(httpStatus.OK).send({
    message: 'API working successfully!',
    success: true,
    data: result,
  });
});

module.exports = {
  createVideoInstant,
  getVideoTranscoding,
};
