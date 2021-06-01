import { Router } from 'express';
import { directoryModel } from '../../models/directory.model';

const directoriesController = Router();

// Create directory
directoriesController.post('/create', async (req, res) => {
	const directory = new directoryModel({
		directoryName: req.body.directoryName,
		location: req.body.location,
		owner: req.body.owner,
		description: req.body.description
	})

	try {
		const savedDirectory = await directory.save();
		res.status(201).json(savedDirectory);
	} catch(err) {
		res.status(400).json( { message: err });
	}
})

// Get all directories in root
directoriesController.get('/', async (req, res) => {
    try {
        const allDirectories = await directoryModel.find();
        res.status(200).json(allDirectories);
    } catch (err) {
        res.status(404).json({ message: err });
    }
})

// Delete directory by directory's id
directoriesController.delete('/:directoryId', async (req, res) => {
    try {
        const deletedDirectory = await directoryModel.remove({ _id: req.params.directoryId });
        res.status(200).json(deletedDirectory);
    } catch(err) {
        res.status(404).json({ message: err });
    }
})

// Update directory name by directory's id
directoriesController.patch('/:directoryId', async (req, res) => {
    try {
        const updatedDirectory = await directoryModel.updateOne({ _id: req.params.directoryId }, 
                                                                { $set: { directoryName: req.params.directoryName} });
        res.status(200).json(updatedDirectory);
    } catch(err) {
        res.status(404).json({ message: err});
    }
})

// TODO - 

export default directoriesController;