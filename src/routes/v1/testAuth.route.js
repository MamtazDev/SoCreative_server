const express = require('express');
const { registerUser, loginUser, allUser } = require('../../controllers/testUser.controller');
const { redisCachingMiddleware } = require('../../middlewares/redis');
const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient();

const router = express.Router();

// Define a middleware function to check cache
function checkCache(req, res, next) {
    const key = req.originalUrl;

    // Check if data exists in Redis cache
    redisClient.get(key, (err, data) => {
        if (err) {
            console.error("redis error: ",err);
            return res.status(500).send('Internal Server Error');
        }

        // If data exists in cache, send it
        if (data !== null) {
            console.log('Data retrieved from cache');
            res.send(JSON.parse(data));
        } else {
            // If data does not exist in cache, move to next middleware
            next();
        }
    });
}

router.get('/all', checkCache,  allUser);

router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;
