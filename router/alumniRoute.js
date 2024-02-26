const express= require('express');
const { signUp, login,handleRefreshToken, getAlumni,updatePassword, getAllAlumni, deleteAlumni, updateAlumni,logout,forgotpassword,resetnewpassword,dashboard } = require('../controller/alumniCtrl');
// const express = require('express');
// const { signUp, login, getAlumni, getAllAlumni, deleteAlumni, updateAlumni, updatePassword, handleRefreshToken, logout, forgotpassword, resetnewpassword } = require('../controller/alumniCtrl');
const { resetpassword } = require('../controller/internCntrl');
const router = express.Router();
const Alumni = require("../models/alumniModel")

router.post('/signup', signUp);

router.post('/login', login);

router.post('/logout', logout);

router.post('/forgot-password-token', forgotpassword);

router.put('/reset-password-token', resetnewpassword);

router.get('/:id', getAlumni);

router.get('/', getAllAlumni);

router.put('/:id', updateAlumni);

router.put('/password', updatePassword);

router.put('/refresh', handleRefreshToken);

router.delete('/:id', deleteAlumni);

router.post('/signup',signUp);
router.post('/login',login);
router.post('/logout',logout);
router.post('/forgot-password-token',forgotpassword);
router.post('/reset-password-token', resetnewpassword);
router.get('/:id',getAlumni);
router.get('/',getAllAlumni);
///http://localhost:4000/api/alumni/signups/count
router.get('/signups/count',dashboard);

router.delete('/:id',deleteAlumni);
router.put('/:id',updateAlumni);

module.exports = router
router.get('/reset-password', resetpassword);

/**
 * @swagger
 * tags:
 *   name: Alumni
 *   description: API operations related to alumni management
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new alumni
 *     description: Endpoint to create a new alumni.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your request body properties here
 *     responses:
 *       200:
 *         description: Alumni registered successfully
 */
 
/**
 * @swagger
 * /api/forgot-password-token:
 *   post:
 *     summary: Request a token for password reset
 *     description: Endpoint to request a token for password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token sent successfully
 */
 
/**
 * @swagger
 * /api/reset-password-token:
 *   put:
 *     summary: Reset alumni password
 *     description: Endpoint to reset alumni password using the provided token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The password reset token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
 
/**
 * @swagger
 * /api/password:
 *   put:
 *     summary: Update alumni password
 *     description: Endpoint to update alumni password.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
 
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Alumni login
 *     description: Endpoint for alumni login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Alumni logged in successfully
 */
 
/**
 * @swagger
 * /api/all-alumni:
 *   get:
 *     summary: Get all alumni
 *     description: Endpoint to retrieve a list of all alumni.
 *     responses:
 *       200:
 *         description: Successfully retrieved all alumni
 */
 
/**
 * @swagger
 * /api/refresh:
 *   put:
 *     summary: Handle refresh token
 *     description: Endpoint to handle refresh token for authentication.
 *     responses:
 *       200:
 *         description: Refresh token handled successfully
 */
 
/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Alumni logout
 *     description: Endpoint for alumni logout.
 *     responses:
 *       200:
 *         description: Alumni logged out successfully
 */
 
/**
 * @swagger
 * /api/{id}:
 *   get:
 *     summary: Get a alumni by ID
 *     description: Endpoint to retrieve a alumni by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The alumni ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the alumni
 */
 
/**
 * @swagger
 * /api/{id}:
 *   delete:
 *     summary: Delete a alumni by ID
 *     description: Endpoint to delete a alumni by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The alumni ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Alumni deleted successfully
 */

module.exports = router;
