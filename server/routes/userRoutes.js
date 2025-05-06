import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
import { paginatedResultsSQL } from '../middlewares/paginatedResult.js';
import { deleteUser, getUserById, updateUser } from '../controllers/userController.js';
import { connectToDatabase } from '../lib/db.js';

const router=express.Router();

router.get('/',verifyToken,authorizeRoles("super_admin"),paginatedResultsSQL('user',["password"]),(req,res)=>{
    res.json(res.paginatedResults);
})
router.get('/me', verifyToken,async (req, res) => {
    const { id, email, role, first_name,last_name } = req.user;
    try {
        const db = await connectToDatabase();
        const [artistResult] = await db.execute('SELECT id,name FROM artist WHERE user_id = ?', [id]);
        const artistId = artistResult.length > 0 ? artistResult[0].id : null;
        const artistName = artistResult.length > 0 ? artistResult[0].name : null;
        res.json({ id, email, role, first_name, last_name, artist_id: artistId ,name: artistName});
      } catch (error) {
        console.error('Error fetching artist ID:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});
router.get('/:id', verifyToken, authorizeRoles("super_admin"),getUserById);
router.put('/:id', verifyToken, authorizeRoles("super_admin"),updateUser);
router.delete('/:id', verifyToken, authorizeRoles("super_admin"), deleteUser);

export default router;