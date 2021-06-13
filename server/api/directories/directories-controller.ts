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

directoriesController.get('/root', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const ownerId: string = req.user.id;
    const rootDirectory = await DirectoryModel.findOne({ownerId, isRoot: true});

    res.status(200).json(rootDirectory);
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
        directoryName: 'root',
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

directoriesController.post('/shared-with-me', verifyToken,(req: AuthenticatedUserRequest, res) => {
    const shared = DirectoryModel.findOne({ownerId: req.user.id, directoryName: 'shared'});
    if (!shared) {
        const sharedDirectory = new DirectoryModel({
            id: new mongoose.Types.ObjectId(),
            parent: null,
            children: [],
            directoryName: 'shared',
            ownerId: req.user.id,
            description: 'shared',
            isRoot: false,
            files: [],
            filesCount: 0
        })

        return res.status(201).json({message: 'Shared directory successfully created'});
    }

    return res.status(200).json({message: 'You already have a shared directory'});
});

directoriesController.get('/shared-with-me', verifyToken, (req: AuthenticatedUserRequest, res) => {
    const shared = DirectoryModel.findOne({ownerId: req.user.id, directoryName: 'shared'});
    if (!shared) {
        return res.status(404).json({message: 'Shared directory not found'});
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