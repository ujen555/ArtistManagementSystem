import { connectToDatabase } from "../lib/db.js";
import { artistCsvValidationSchema, artistRegisterValidationSchema, artistValidationSchema } from "../schemas/validationSchema.js";
import fs from 'fs';
import csvParser from 'csv-parser';
import {Parser} from 'json2csv';

const createArtist = async (req, res) => {
    try {
        await artistRegisterValidationSchema.validate(req.body, { abortEarly: false });
        const {
          name,
          dob,
          gender,
          address,
          first_release_year,
          no_of_albums_released,
          user_id
        } = req.body;
    
        const db = await connectToDatabase();
    
       
        const [user] = await db.query(
          'SELECT * FROM user WHERE id = ? AND role = "artist"',
          [user_id]
        );
        if (!user.length) {
          return res.status(400).json({ message: 'User does not exist or is not an artist' });
        }
    
        const [existingArtist] = await db.query(
          'SELECT * FROM artist WHERE user_id = ?',
          [user_id]
        );
        if (existingArtist.length) {
          return res.status(400).json({ message: 'Artist already exists for this user' });
        }
        const [result] = await db.query(
          'INSERT INTO artist (name, dob, gender, address, first_release_year, no_of_albums_released, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name, dob, gender, address, first_release_year, no_of_albums_released, user_id]
        );
    
        return res.status(201).json({ message: 'Artist created successfully', artistId: result.insertId });
      } catch (error) {
        if (error.name === 'ValidationError') {
          return res.status(400).json({ message: error.errors });
        }
        console.error('Error creating artist:', error);
        return res.status(500).json({ message: 'Server error' });
      }
    
  };
  


  const getUnregisteredArtistUsers = async (req, res) => {
    try {
      const db = await connectToDatabase();
  
      const [users] = await db.query(`
        SELECT * FROM user
        WHERE role = 'artist' AND id NOT IN (SELECT user_id FROM artist)
      `);
  
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching unregistered artist users:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };



  const updateArtist = async (req, res) => {
    const { id } = req.params;
    try {
      const validatedData = await artistValidationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
  
      const {
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released,
      } = validatedData;
  
      const db = await connectToDatabase();
  
      const [existingArtist] = await db.execute('SELECT id FROM artist WHERE id = ?', [id]);
      if (existingArtist.length === 0) {
        return res.status(404).json({ message: 'Artist not found' });
      }
      await db.execute(
        `UPDATE artist
         SET name = ?, dob = ?, gender = ?, address = ?, first_release_year = ?, no_of_albums_released = ?
         WHERE id = ?`,
        [
          name,
          dob ? new Date(dob) : null,
          gender || null,
          address || null,
          first_release_year || null,
          no_of_albums_released || null,
          id,
        ]
      );
  
      const [updatedArtist] = await db.execute('SELECT * FROM artist WHERE id = ?', [id]);
  
      res.json({
        message: 'Artist updated successfully',
        artist: updatedArtist[0],
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', errors: error.errors });
      }
  
      console.error('Error updating artist:', error);
      res.status(500).json({ message: 'Database error' });
    }
  };

  const getArtistById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const db = await connectToDatabase();
      const [result] = await db.execute(
        `SELECT 
           a.id , 
           a.name, 
           a.dob, 
           a.gender, 
           a.address, 
           a.first_release_year, 
           a.no_of_albums_released, 
           a.user_id,
           u.email, 
           u.first_name, 
           u.last_name
         FROM artist a
         JOIN user u ON a.user_id = u.id
         WHERE a.id = ?`,
        [id]
      );
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Artist not found' });
      }
  
      res.json(result[0]);
    } catch (error) {
      console.error('Error fetching artist:', error);
      res.status(500).json({ message: 'Database error' });
    }
  };


  const deleteArtist = async (req, res) => {
    const { id } = req.params;
    try {
      const db = await connectToDatabase();
      const [result] = await db.query('DELETE FROM artist WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Arist not found' });
      }
      res.json({ message: 'Arist deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };




  const importArtistsCSV = async (req, res) => {
    const filePath = req.file?.path;
    if (!filePath) return res.status(400).json({ message: 'CSV file not provided' });
  
    const results = [];
    const warnings = [];
  
    try {
      const db = await connectToDatabase();
  
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => results.push(row))
        .on('end', async () => {
          const validArtists = [];
  
          for (const [index, row] of results.entries()) {
            try {
              const cleaned = {
                ...row,
                first_release_year: row.first_release_year ? Number(row.first_release_year) : null,
                no_of_albums_released: row.no_of_albums_released ? Number(row.no_of_albums_released) : null,
                dob: row.dob ? new Date(row.dob).toISOString().split('T')[0] : null,
                gender: row.gender || null,
                address: row.address || null,
                name: row.name?.trim(),
                email: row.email?.trim(),
              };
  
              await artistCsvValidationSchema.validate(cleaned, { abortEarly: false });
  
              const [userRows] = await db.query('SELECT id FROM user WHERE email = ? AND role = "artist"', [cleaned.email]);
              if (!userRows.length) {
                const msg = `Skipping row ${index + 1}: No artist user found with email ${cleaned.email}`;
                console.warn(msg);
                warnings.push(msg);
                continue;
              }
  
              const user_id = userRows[0].id;
  
              const [existing] = await db.query('SELECT id FROM artist WHERE user_id = ?', [user_id]);
              if (existing.length) {
                const msg = `Skipping row ${index + 1}: Artist already exists for email ${cleaned.email}`;
                console.warn(msg);
                warnings.push(msg);
                continue;
              }
  
              validArtists.push([
                cleaned.name,
                cleaned.dob,
                cleaned.gender,
                cleaned.address,
                cleaned.first_release_year,
                cleaned.no_of_albums_released,
                user_id
              ]);
            } catch (validationErr) {
              const msg = `Skipping row ${index + 1}: Validation failed - ${validationErr.errors.join(', ')}`;
              console.warn(msg);
              warnings.push(msg);
            }
          }
          if (validArtists.length > 0) {
            await db.query(
              `INSERT INTO artist (name, dob, gender, address, first_release_year, no_of_albums_released, user_id)
               VALUES ?`,
              [validArtists]
            );
          }
  
          fs.unlinkSync(filePath);
          return res.json({
            message: 'Artist CSV import completed',
            imported: validArtists.length,
            warnings
          });
        });
    } catch (err) {
      console.error('Error importing artists from CSV:', err);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return res.status(500).json({ message: 'Failed to import artists' });
    }
  };


 const exportArtistsCSV = async (req, res) => {
    try {
      const db = await connectToDatabase();
  
      const [artists] = await db.execute(`
        SELECT 
          a.name, 
          a.dob, 
          a.gender, 
          a.address, 
          a.first_release_year, 
          a.no_of_albums_released, 
          u.email 
        FROM artist a
        LEFT JOIN user u ON a.user_id = u.id
      `);
  
      const fields = ['name','dob', 'gender', 'address', 'first_release_year', 'no_of_albums_released', 'email'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(artists);
  
      res.header('Content-Type', 'text/csv');
      res.attachment('artists.csv');
      res.send(csv);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      res.status(500).json({ message: 'Error exporting artists' });
    }
  };
  export {createArtist,getUnregisteredArtistUsers,updateArtist,getArtistById,deleteArtist,importArtistsCSV,exportArtistsCSV};