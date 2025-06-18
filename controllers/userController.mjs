

import User from '../models/userModel.mjs'; // adjust path if different
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Optionally omit password in response
    const userToReturn = { ...newUser._doc };
    delete userToReturn.password;

    res.status(201).json({
      message: 'User registered successfully.',
      user: userToReturn
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};




export const changeUserRole = async (req, res) => {
 try {
    const { id } = req.params;
    const { role } = req.body;
      
    const allowedRoles = ['user', 'admin', 'moderator'];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }
    const existingUser = await User.findOne({ _id:id });
    
    if (existingUser.role == role){
      return res.status(400).json({ message: `user is already ${role}` });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  

    res.status(200).json({
      message: `User role updated to ${role}`,
      user,
    });

    
  } catch (error) {
   console.error('change role error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};