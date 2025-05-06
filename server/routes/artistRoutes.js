import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { createArtist, deleteArtist, getArtistById, getUnregisteredArtistUsers, updateArtist,importArtistsCSV, exportArtistsCSV } from "../controllers/artistController.js";
import { paginatedResultsSQL } from "../middlewares/paginatedResult.js";
import { upload } from "../middlewares/fileUploadMiddleware.js";

const router=express.Router();


router.get('/',verifyToken,authorizeRoles("super_admin","artist_manager"),paginatedResultsSQL('artist',["password"]),(req,res)=>{
    res.json(res.paginatedResults);
})

router.post('/create-artist',verifyToken,authorizeRoles("artist_manager"),createArtist);
router.get('/unregistered-artists', verifyToken, authorizeRoles('artist_manager'), getUnregisteredArtistUsers);
router.put('/:id', verifyToken, authorizeRoles("artist_manager"),updateArtist);
router.get('/export',verifyToken, authorizeRoles("artist_manager"), exportArtistsCSV);
router.get('/:id', verifyToken, authorizeRoles("artist_manager","super_admin"),getArtistById);
router.delete('/:id', verifyToken, authorizeRoles("artist_manager"), deleteArtist);
router.post(
    '/import-artists-csv',
    verifyToken,
    authorizeRoles('artist_manager'),
    upload.single('file'),
    importArtistsCSV
  );
export default router;