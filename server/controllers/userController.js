import { connectToDatabase } from "../lib/db.js";
import { userValidationSchema } from "../schemas/validationSchema.js";

const getUserById=async (req,res)=>{
    const { id } = req.params;
  
    try {
      const db = await connectToDatabase();
      const [result] = await db.execute('SELECT id, email, role, first_name, last_name, phone, dob, address, gender FROM user WHERE id = ?', [id]);
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Database error' });
    }
}

const updateUser=async (req,res)=>{
    const { id } = req.params;

    try {
      const validatedData = await userValidationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
  
      const {
        first_name,
        last_name,
        email,
        dob,
        phone,
        address,
        role,
        gender,
      } = validatedData;
  
      const db = await connectToDatabase();
  
      const [existingUser] = await db.execute('SELECT id FROM user WHERE id = ?', [id]);
      if (existingUser.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await db.execute(
        `UPDATE user
         SET first_name = ?, last_name = ?, email = ?, dob = ?, phone = ?, address = ?, role = ?, gender = ?
         WHERE id = ?`,
        [
          first_name,
          last_name,
          email,
          dob ? new Date(dob) : null,
          phone || null,
          address || null,
          role,
          gender || null,
          id,
        ]
      );
  
      const [updatedUser] = await db.execute(
        `SELECT id, email, role, first_name, last_name, phone, dob, address, gender
         FROM user WHERE id = ?`,
        [id]
      );
  
      res.json({
        message: 'User updated successfully',
        user: updatedUser[0],
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', errors: error.errors });
      }
  
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Database error' });
    }
}


const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectToDatabase();
    const [result] = await db.query('DELETE FROM user WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export {getUserById,updateUser,deleteUser};