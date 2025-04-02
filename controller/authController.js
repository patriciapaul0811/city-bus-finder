const User = require('../models/User');

// Register user
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role
    });
    
    // Create token
    const token = user.getSignedJwtToken();
    
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }
    
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Create token
    const token = user.getSignedJwtToken();
    
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};