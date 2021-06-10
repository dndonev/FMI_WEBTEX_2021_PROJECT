import { Router } from 'express';
import { CloudObjectType } from '../../enums/cloud-object-type';
import { AuthenticatedUserRequest } from '../../interfaces/user';
import { verifyToken } from '../../middleware/auth';
import { DirectoryModel } from '../../models/directory.model';

const directoriesController = Router();

// Create directory
directoriesController.post('/create', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const ownerId: string = req.user.id;
    const isRoot: boolean = !(await DirectoryModel.findOne({ownerId, isRoot: true}));

    const directory = new DirectoryModel({
        directoryName: req.body.directoryName,
        path: req.body.path,
        ownerId,
        description: req.body.description,
        type: CloudObjectType.Folder,
        isRoot
    });

    const validation = directory.validateSync();
    if (validation) {
        return res.status(400).json(validation);
    }

    try {
        const savedDirectory = await directory.save();
        res.status(201).json(savedDirectory);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

directoriesController.get('/root', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const ownerId: string = req.user.id;
    const rootDirectory = await DirectoryModel.findOne({ownerId, isRoot: true});

    res.status(200).json({ rootDirectory });
});

// Get all directories in root
directoriesController.get('/', verifyToken, async (req: AuthenticatedUserRequest, res) => {
    const ownerId: string = req.user.id;

    try {
        const allDirectories = await DirectoryModel.find({ownerId, isRoot: true });
        res.status(200).json(allDirectories);
    } catch (err) {
        res.status(404).json({ message: err });
    }
})

// Delete directory by directory's id
directoriesController.delete('/:directoryId', verifyToken, async (req, res) => {
    try {
        const deletedDirectory = await DirectoryModel.findByIdAndRemove(req.body.directoryId);
        res.status(200).json(deletedDirectory);
    } catch (err) {
        res.status(404).json({ message: err });
    }
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