// middleware/roles.js
function roles(requiredRole) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
}

module.exports = roles; 
exports.getDirectors = async (req, res) => {
  res.json({ message: 'List of directors' });
};

exports.createDirector = async (req, res) => {
  res.json({ message: 'Director created' });
};
