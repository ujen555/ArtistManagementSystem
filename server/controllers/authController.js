import { connectToDatabase } from "../lib/db.js";
import { loginValidationSchema, registerValidationSchema } from "../schemas/validationSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    try {
        await loginValidationSchema.validate(req.body, { abortEarly: false });
        const { email, password } = req.body;
        const db=await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM `user` WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User does not exist'});
        }
        const isMatch= await bcrypt.compare(password,rows[0].password);
        if(!isMatch){
            return res.status(401).json({ message: 'Incorrect Password' });
        }
        const token=jwt.sign({
            id:rows[0].id,
            first_name:rows[0].first_name,
            last_name:rows[0].last_name,
            email: rows[0].email,
            role: rows[0].role
        },process.env.JWT_SECRET, {expiresIn:'3h'})
        return res.status(201).json({token:token,message:"User authenticated successfully"});
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export {login,register};