import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router=express.Router();

// only super admin can access this route 
router.get('/',verifyToken,authorizeRoles("super_admin"),(req,res)=>{
    res.json({message:"listing userse"});
})

router.get('/me', verifyToken, (req, res) => {
    const { id, email, role, first_name,last_name } = req.user;
    res.json( { id, email, role, first_name,last_name }); // Return basic user info
});

export default router;