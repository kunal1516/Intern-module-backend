const express= require('express');
const { signUp, login, getAlumni, getAllAlumni, deleteAlumni, updateAlumni, updatePassword, handleRefreshToken, logout, forgotpassword, resetnewpassword} = require('../controller/alumniCtrl');
const { resetpassword } = require('../controller/internCntrl');
const router = express.Router();


router.post('/signup',signUp);
router.post('/login',login);
router.post('/logout',logout);
router.post('/forgot-password-token',forgotpassword);
router.post('/reset-password-token', resetnewpassword);
router.get('/:id',getAlumni);
router.get('/',getAllAlumni);
router.get('/reset-password', resetpassword);
router.put('/:id',updateAlumni);
router.put('/:id',updatePassword);
router.put('/',handleRefreshToken);
router.delete('/:id',deleteAlumni);

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
router.post('/signup', signUp);

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
router.post("/forgot-password-token", forgotpassword);

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
router.post("/reset-password-token", resetnewpassword);

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
router.put('/:id', updatePassword);

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
router.post('/login', login);

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
router.get('/', getAllAlumni);

/**
 * @swagger
 * /api/refresh:
 *   get:
 *     summary: Handle refresh token
 *     description: Endpoint to handle refresh token for authentication.
 *     responses:
 *       200:
 *         description: Refresh token handled successfully
 */
router.put('/refresh', handleRefreshToken);

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: Alumni logout
 *     description: Endpoint for alumni logout.
 *     responses:
 *       200:
 *         description: Alumni logged out successfully
 */
router.post('/logout', logout);

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
router.get('/:id', getAlumni);

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

router.delete('/:id',deleteAlumni);

module.exports = router