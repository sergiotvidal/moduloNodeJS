'use strict';

const express = require('express');
const profileController = require('../controllers/user/user_profile_controller');
const tokenChecker = require('../controllers/session/check_jwt_controller');

const router = express.Router();

router.get('/user/profile', tokenChecker, profileController);

module.exports = router;
