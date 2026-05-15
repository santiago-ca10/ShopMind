import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    'shopmind-secret-key',
    {
      expiresIn: '7d'
    }
  );
};

export default generateToken;