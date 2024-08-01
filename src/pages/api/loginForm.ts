import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import AdmissionForm, { IAdmissionForm } from "../models/AdmissionFormProf";
import { createToken } from './creatToken'; // Helper function to create JWT

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Find user by email
            const user = await AdmissionForm.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Generate JWT token (example function, create your own)
            const token = createToken(user._id);

            // Return token or session ID
            res.status(200).json({ token });
        } catch (error) {
            // Handle database or validation errors
            res.status(500).json({ error: 'Failed to log in' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
