
import { connectToDatabase } from "../lib/db.js";

export const getSongsByArtistId = async (req, res) => {
  const artistId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const db = await connectToDatabase();

    const [totalResult] = await db.execute(
      `SELECT COUNT(*) AS count FROM song WHERE artist_id = ?`,
      [artistId]
    );
    const total = totalResult[0].count;

    const [songs] = await db.execute(
      `SELECT * FROM song WHERE artist_id = ? ORDER BY id DESC LIMIT ? OFFSET ?`,
      [artistId, limit, offset]
    );

    const results = {
      next: offset + limit < total ? { page: page + 1, limit } : null,
      previous: offset > 0 ? { page: page - 1, limit } : null,
      results: songs,
      total_data: total
    };

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

  export const addSong = async (req, res) => {
    const { title, album_name, genre, artist_id } = req.body;
  
    if (!title || !genre || !album_name || !artist_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const db = await connectToDatabase();
      const [result] = await db.execute(
        "INSERT INTO song (title, album_name, genre, artist_id) VALUES (?, ?, ?, ?)",
        [title, album_name, genre, artist_id]
      );
  
      const song_id = result.insertId; 
      res.status(201).json({ message: "Song added successfully", song_id });
    } catch (error) {
      console.error("Error adding song:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  

  export const getSongById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const db = await connectToDatabase();
      const [rows] = await db.execute("SELECT * FROM song WHERE id = ?", [id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "Song not found" });
      }
  
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error fetching song by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  export const editSong = async (req, res) => {
    const { title, album_name, genre } = req.body;
    const { id } = req.params;
    if(!id){
      return res.status(400).json({ message: "Song Id is required" });
    }
    if (!title || !genre || !album_name) {
      return res.status(400).json({ message: "All fields are required" });
    }

  
    try {
      const db = await connectToDatabase();
      await db.execute(
        `UPDATE song
        SET title = ?, album_name = ?, genre = ?
        WHERE id = ?`,
        [title, album_name, genre,id]
      );


      const [updatedSong] = await db.execute('SELECT * FROM song WHERE id = ?', [id]);
  
      res.json({
        message: 'Song updated successfully',
        song: updatedSong[0],
      });
    } catch (error) {
      console.error("Error updating song:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  export const deleteSongById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const db = await connectToDatabase();
  
      const [existing] = await db.execute("SELECT id FROM song WHERE id = ?", [id]);
      if (existing.length === 0) {
        return res.status(404).json({ message: "Song not found" });
      }
  
      await db.execute("DELETE FROM song WHERE id = ?", [id]);
  
      res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
      console.error("Error deleting song:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  