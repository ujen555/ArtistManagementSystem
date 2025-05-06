import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { addSong, deleteSongById, editSong, getSongById, getSongsByArtistId } from "../controllers/songController.js";
import { checkOwnershipOrAdmin } from "../middlewares/checkOwnership.js";

const router=express.Router();


router.get(
    "/songs-by-artistid/:id",
    verifyToken,
    authorizeRoles("super_admin", "artist_manager", "artist"),
    checkOwnershipOrAdmin("id","artist"),
    getSongsByArtistId
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("artist"),
    checkOwnershipOrAdmin("id","song"),
    editSong
  );

router.post(
    "/",
    verifyToken,
    authorizeRoles("artist"),
    addSong
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("artist",),
    checkOwnershipOrAdmin("id","song"),
    getSongById
  );
  router.delete('/:id', verifyToken, authorizeRoles("artist",'song'), deleteSongById);
export default router;