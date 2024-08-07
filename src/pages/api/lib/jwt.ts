// lib/jwt.ts
import jwt from 'jsonwebtoken';

export function generateToken(userId: string): string {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
}
