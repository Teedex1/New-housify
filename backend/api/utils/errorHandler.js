class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (res, error) => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    });
  }

  // Prisma error handling
  if (error.code) {
    switch (error.code) {
      case 'P2002': // Unique constraint violation
        return res.status(400).json({
          status: 'fail',
          message: 'A record with this information already exists.'
        });
      case 'P2025': // Record not found
        return res.status(404).json({
          status: 'fail',
          message: 'Record not found.'
        });
      default:
        break;
    }
  }

  // Handle file upload errors
  if (error.message.includes('Failed to upload')) {
    return res.status(400).json({
      status: 'fail',
      message: 'File upload failed. Please try again.'
    });
  }

  // Default error response
  return res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred. Please try again later.'
  });
};

module.exports = {
  AppError,
  handleError
};
