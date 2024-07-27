import jwt from 'jsonwebtoken';

const secret = 'your_secret_key'; // Replace with your actual secret key

export const createToken = (userId: string): string => {
    const token = jwt.sign({ userId }, secret, { expiresIn: '1h' }); // Token expires in 1 hour
    return token;
};
