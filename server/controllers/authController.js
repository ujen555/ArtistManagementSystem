import { connectToDatabase } from "../lib/db.js";
import { registerValidationSchema } from "../schemas/validationSchema.js";
import bcrypt from 'bcrypt';

const register=async (req, res)=>{
   try {
      await registerValidationSchema.validate(req.body, { abortEarly: false });
      const { first_name, last_name, email, password, phone, dob, gender, address, role } = req.body;
      const db=await connectToDatabase();
      const [existingUser] = await db.query('SELECT * FROM `user` WHERE email = ?', [email]);
      if (existingUser.length) {
          return res.status(400).json({ message: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.query(
          'INSERT INTO `user` (first_name, last_name, email, password, phone, dob, gender, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [first_name, last_name, email, hashedPassword, phone, dob, gender, address, role]
      );
      return res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
      if (error.name === 'ValidationError') {
          return res.status(400).json({ message: error.errors });
      }
      return res.status(500).json({ message: 'Server error' });
  }
}

const login=async (req,res)=>{

}

export {login,register};