import { Router } from 'express';
import mongoose from 'mongoose'
import { Directory, NewDirectory } from '../../interfaces/directory';
import { AuthenticatedUserRequest } from '../../interfaces/user';
import { verifyToken } from '../../middleware/auth';
import { DirectoryModel } from '../../models/directory.model';

const directoriesController = Router();

// Create directory

directoriesController.post('/create', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const ownerId = req.user.id;
    const currentId = req.body.id as string;
    const toCreate = req.body.newDir as NewDirectory;

    const newDirectory = new DirectoryModel({
        id: new mongoose.Types.ObjectId(),
        directoryName: toCreate.directoryName, 
        description: toCreate.description,
        files: [],
        parent: currentId,
        isRoot: false,
        children: [],
        ownerId,
        filesCount: 0
    });

    const validation = newDirectory.validateSync();
    if (validation) {
        return res.status(400).json(validation);
    }

    try {
        await newDirectory.save();
        const currentDirectory = 
            (await DirectoryModel.findOneAndUpdate({id: currentId}, {
                $push: {children: newDirectory}
            })).toJSON() as Directory;
        
        return res.status(201).json(newDirectory);
    } catch {
        return res.status(500).json({error: 'There was an error creating your directory'});
    }
});

directoriesController.post('/root', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const ownerId = req.user.id;
    const rootDirectory = await DirectoryModel.findOne({ ownerId, isRoot: true });
    if (rootDirectory) {
        return res.status(200).json(rootDirectory);
    }

    const root = new DirectoryModel({
        id: new mongoose.Types.ObjectId(),
        ownerId,
        parent: null,
        children: [],
        isRoot: true,
        directoryName: 'Root',
        files: [],
        filesCount: 0
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

directoriesController.post('/shared-with-me', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const shared = await DirectoryModel.findOne({ownerId: req.user.id, isShared: true});
    if (!shared) {
        try {
            const shareCreated = new DirectoryModel({
                id: new mongoose.Types.ObjectId(),
                parent: null,
                children: [],
                directoryName: 'Shared',
                ownerId: req.user.id,
                description: 'shared',
                isRoot: false,
                isShared: true,
                files: []
            })
    
            await shareCreated.save();
            return res.status(201).json(shareCreated);
        } catch(e) {
            return res.status(500).json(e);
        }
    }

    return res.status(200).json(shared);
});

directoriesController.get('/:directoryId', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const directoryId = req.params.directoryId;
    const ownerId = req.user.id;

    const directory = await DirectoryModel.findOne({ id: directoryId, ownerId});
    if (!directory) {
        return res.status(404).json({error: 'No such directory'})
    }

    res.status(200).json(directory.toJSON());
});

directoriesController.get('/', async (req, res) => {
    try {
		const allFiles = await DirectoryModel.find();
		res.status(200).json(allFiles);
	} catch (err) { 
		res.status(404).json({ message: err });
	}
})

export default directoriesController;