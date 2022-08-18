const express = require('express');
const router = express.Router();
const verifyToken = require('../helpers/verifyToken');

router.use(verifyToken);
router.get('/api/v1/users');
