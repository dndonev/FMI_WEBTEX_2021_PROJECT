
import { Router } from 'express'
import { AuthenticatedUserRequest, User } from '../../interfaces/user';
import { verifyToken } from '../../middleware/auth';
import { FileModel } from '../../models/file.model';
import { UserModel } from '../../models/user.model';

const shareController = Router();

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

shareController.post('/share', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const ownerId = req.user.id;
    const {path: path, fileName: fileName, email: emailToShareTo} = req.body;

    if (!emailToShareTo && emailToShareTo === '') {
        return res.status(400).json({error: 'Invalid parameter - email'});
    }

    try {
        const user = (await UserModel.findOne({email: emailToShareTo})).toJSON() as User;

        await FileModel.findOneAndUpdate({path, fileName, ownerId}, {sharedToIds: [user]});

        return res.sendStatus(204);

    } catch {
        return res.status(500).json({error: 'There was an error sharing your file'});
    }
});

export default shareController;