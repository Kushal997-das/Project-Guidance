// Error handling middleware
exports.handleErrors = (error, req, res, next) => {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Unable to process your request now. Please try again later!" });
};
