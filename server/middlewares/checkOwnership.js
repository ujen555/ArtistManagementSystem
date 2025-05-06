import { connectToDatabase } from "../lib/db.js";

export const checkOwnershipOrAdmin = (paramKey = "id", type = "artist") => {
  return async (req, res, next) => {
    const loggedInUser = req.user;
    const requestedId = req.params[paramKey];

    if (["super_admin", "artist_manager"].includes(loggedInUser.role)) {
      return next();
    }

    if (loggedInUser.role === "artist") {
      try {
        const db = await connectToDatabase();

        if (type === "song") {
          const [songRows] = await db.query(
            `SELECT song.artist_id 
             FROM song 
             INNER JOIN artist ON song.artist_id = artist.id 
             WHERE song.id = ? AND artist.user_id = ?`,
            [requestedId, loggedInUser.id]
          );

          const song = songRows[0];

          if (!song) {
            return res.status(403).json({ message: "Access denied. You do not own this song." });
          }

          return next();
        }

        if (type === "artist") {
          const [artistRows] = await db.query(
            "SELECT id FROM artist WHERE user_id = ? AND id = ? LIMIT 1",
            [loggedInUser.id, requestedId]
          );

          const artist = artistRows[0];

          if (!artist) {
            return res.status(403).json({ message: "Access denied. You do not own this artist profile." });
          }

          return next();
        }

      } catch (error) {
        return res.status(500).json({ message: "Server error", error });
      }
    }

    return res.status(403).json({ message: "Access denied." });
  };
};