module.exports = function errorHandler(err, req, res, next) {
	console.error(err)
	if (err.name === 'UnauthorizedError') {
			return res.status(401).json({ message: 'Invalid Token' });
	}
	return res.status(500).json({ message: err.message });
}
