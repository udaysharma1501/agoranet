const User = require('../models/User');

// @desc    Get current user info
// @route   GET /api/users/me
// @access  Private

// const getCurrentUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching current user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
const getCurrentUser = async (req, res) => {
  try {
    console.log('Decoded user in req.user:', req.user);

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      console.log('No user found for ID:', req.user.id);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', user);
    res.json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { getCurrentUser };
