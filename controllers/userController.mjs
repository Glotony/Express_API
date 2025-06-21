import User from '../models/userModel.mjs'; // adjust path if needed
import bcrypt from 'bcryptjs';

// CREATE user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) 
      return res.status(400).json({ message: 'All fields are required.' });

    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return res.status(409).json({ message: 'User with this email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const userToReturn = { ...newUser._doc };
    delete userToReturn.password;

    res.status(201).json({ message: 'User registered successfully.', user: userToReturn });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// READ all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // omit passwords
    res.status(200).json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// READ user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// UPDATE user by ID
export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found.' });

    res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// DELETE user by ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// CHANGE user role
export const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const allowedRoles = ['user', 'admin', 'moderator'];
    if (!allowedRoles.includes(role)) return res.status(400).json({ message: 'Invalid role.' });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (user.role === role) return res.status(400).json({ message: `User is already ${role}` });

    user.role = role;
    await user.save();

    res.status(200).json({ message: `User role updated to ${role}`, user });
  } catch (error) {
    console.error('Change role error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
