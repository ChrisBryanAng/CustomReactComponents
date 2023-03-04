import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const token = req.headers?.authorization?.split(' ')[1];

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decodedData?.id,
        email: decodedData?.email,
        fullName: decodedData?.fullName,
        favorites: decodedData?.favorites || [],
      };
    } else {
      throw new Error('No token provided or invalid token');
    }
  } else {
    throw new Error('Error with Headers, Use format Bearer (valid JWT token) in authorization header');
  }
  next();
});
