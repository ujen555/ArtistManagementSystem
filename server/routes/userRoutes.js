import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
import { paginatedResultsSQL } from '../middlewares/paginatedResult.js';
import { deleteUser, getUserById, updateUser } from '../controllers/userController.js';

const router=express.Router();

// only super admin can access this route 
router.get('/',verifyToken,authorizeRoles("super_admin"),paginatedResultsSQL('user',["password"]),(req,res)=>{
    res.json(res.paginatedResults);
})

router.get('/me', verifyToken, (req, res) => {
    const { id, email, role, first_name,last_name } = req.user;
    res.json( { id, email, role, first_name,last_name }); // Return basic user info
});


router.get('/:id', verifyToken, authorizeRoles("super_admin"),getUserById);

router.put('/:id', verifyToken, authorizeRoles("super_admin"),updateUser);
router.delete('/:id', verifyToken, authorizeRoles("super_admin"), deleteUser);

export default router;