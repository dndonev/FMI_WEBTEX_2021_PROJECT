import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import mongoose from 'mongoose'
import { CloudObjectType } from '../../enums/cloud-object-type';
import { Directory, NewDirectory } from '../../interfaces/directory';
import { AuthenticatedUserRequest } from '../../interfaces/user';
import { verifyToken } from '../../middleware/auth';
import { DirectoryModel } from '../../models/directory.model';

const directoriesController = Router();

// Create directory

//root/dir1/dir2/dir3/dir1
//root/dir2/dir1/dir3/dir1
directoriesController.post('/create', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const ownerId = req.user.id;
    const current = req.body.id as string;
    const toCreate = req.body.newDir as NewDirectory;

    const newDirectory = new DirectoryModel({
        id: new mongoose.Types.ObjectId(),
        directoryName: toCreate.directoryName, 
        description: toCreate.description,
        files: [],
        parent: current,
        isRoot: false,
        children: [],
        ownerId
    });

    const validation = newDirectory.validateSync();
    if (validation) {
        return res.status(400).json(validation);
    }

    try {
        await newDirectory.save();
        const currentDirectory = 
            (await DirectoryModel.findByIdAndUpdate(current, {
                $push: {children: newDirectory.id}
            })).toJSON() as Directory;
        
        return res.status(201).json(newDirectory);
    } catch {
        return res.status(500).json({error: 'There was an error creating your directory'});
    }
});

directoriesController.get('/root', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const ownerId: string = req.user.id;
    const rootDirectory = await DirectoryModel.findOne({ownerId, isRoot: true});

    res.status(200).json(rootDirectory);
});

directoriesController.post('/root', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const ownerId = req.user.id;

    const root = new DirectoryModel({
        id: new mongoose.Types.ObjectId(),
        ownerId,
        parent: null,
        children: [],
        isRoot: true,
        directoryName: 'root'
    });

    const validation = root.validateSync();
    if (validation) {
        return res.status(400).json(validation);
    }

    try {
        const success = await root.save();
        return res.status(201).json(success);
    } catch {
        return res.status(500).json({error: 'There was an error creating root!'});
    }
});

directoriesController.get('/:directoryId', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const directoryId = req.params.directoryId;
    const ownerId = req.user.id;

    const directory = await DirectoryModel.findOne({ id: directoryId, ownerId});
    if (!directory) {
        return res.status(404).json({error: 'No such directory'})
    }

    res.status(200).json(directory.toJSON());
})


// Update directory name by directory's id
directoriesController.patch('/:directory', verifyToken , async (req: AuthenticatedUserRequest, res) => {
    const ownerId: string = req.user.id;
    const directoryName: string = req.body.directory as string;
    
    try {
        const updatedDirectory = 
            await DirectoryModel.findOneAndUpdate({ ownerId }, { directoryName });
        res.status(200).json(updatedDirectory);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

export default directoriesController;