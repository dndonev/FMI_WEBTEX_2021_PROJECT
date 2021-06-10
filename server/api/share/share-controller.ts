
import { Router } from 'express'
import { AuthenticatedUserRequest, User } from '../../interfaces/user';
import { verifyToken } from '../../middleware/auth';
import { UserModel } from '../../models/user.model';

const shareController = Router();

// Upload new file
shareController.get('/:email', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const email: string = req.params.email;

    if (!email && email === '') {
        return res.status(400).json({error: 'Invalid parameters - email'});
    }

    const regex = new RegExp(email, 'i');
    const users = await UserModel.find({email: {$regex: regex}});
    if (!users && !users.length) {
        return res.status(404).json({error: 'No users found'});
    }

    const mapped = users.map(u => {
        const user: User = u.toJSON() as User;
        return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
    });

    res.status(200).json(mapped);
});

export default shareController;