const express = require('express')
const router = express.Router()
const {uploadProfile } = require('../middleware/uploadImages}')
const { signUp, login, getAll, gets, updateIntern, deleteIntern, updatePassword, handleRefreshToken,resetnewpassword, resetpassword, forgotpassword,logout, dashboard, getintern, uploadProfilePhoto, search} = require('../controller/internCntrl')
const {internMiddleware,isAdmin}=require('../middleware/internMiddleware')

router.post('/signUp',signUp)

router.post('/login' , login)

router.post('/forgot-password-token',forgotpassword)

router.post('/logout',logout)

//router.post ( '/upload' , uploadProfile)

router.get('/get' ,  getAll)

router.get('/getintern', internMiddleware  , getintern , gets )

router.get('/reset-password',resetpassword)

router.get('/interns/count',dashboard)

router.get("/myNetwork",internMiddleware,search)

router.put('/update/:id', updateIntern)

router.put('/refresh' , handleRefreshToken)

router.put('/updatePassword/:id' ,updatePassword)

router.post('/reset-password-token',resetnewpassword)

router.delete('/:id' ,deleteIntern)

/**
 * @swagger
 * tags:
 *   name: Intern
 *   description: API operations related to intern management
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new intern
 *     description: Endpoint to create a new intern.
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
 *         description: Intern registered successfully
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
 *     summary: Reset intern password
 *     description: Endpoint to reset intern password using the provided token.
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
 *     summary: Update intern password
 *     description: Endpoint to update intern password.
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
 *     summary: Intern login
 *     description: Endpoint for intern login.
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
 *         description: Intern logged in successfully
 */
router.post('/login', login);

/**
 * @swagger
 * /api/all-intern:
 *   get:
 *     summary: Get all intern
 *     description: Endpoint to retrieve a list of all intern.
 *     responses:
 *       200:
 *         description: Successfully retrieved all intern
 */
router.get('/', getAll);

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
 *     summary: Intern logout
 *     description: Endpoint for intern logout.
 *     responses:
 *       200:
 *         description: Intern logged out successfully
 */
router.post('/logout', logout);

/**
 * @swagger
 * /api/{id}:
 *   get:
 *     summary: Get a intern by ID
 *     description: Endpoint to retrieve a intern by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The intern ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the intern
 */
router.get('/:id', gets);

/**
 * @swagger
 * /api/{id}:
 *   delete:
 *     summary: Delete a intern by ID
 *     description: Endpoint to delete a intern by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The intern ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Intern deleted successfully
 */

router.delete('/:id',deleteIntern);

module.exports = router