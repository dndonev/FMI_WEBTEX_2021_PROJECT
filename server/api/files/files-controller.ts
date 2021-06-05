
import { Router } from 'express'
import { AuthenticatedUserRequest } from '../../interfaces/user';
import { verifyToken } from '../../middleware/auth';
import { FileModel } from '../../models/file.model';

const filesController = Router();

// Upload new file
filesController.post('/upload', verifyToken, async (req: AuthenticatedUserRequest, res) => {
	const userId = req.user.id;

	const file = new FileModel({
		fileName: req.body.fileName,
		location: req.body.location,
		ownerId: userId
	});

	const validation = file.validateSync();
	if (validation) {
		return res.status(400).json(validation);
	}

	try {
		const savedFile = await file.save();
		res.status(201).json(savedFile);
	} catch (err) {
		res.status(400).json({ message: err });
	}
})

// Get single file by ID
filesController.get('/:fileId', async (req, res) => {
	//

	try {
		const file = await FileModel.findById(req.params.fileId);
		res.status(200).json(file);
		//
	} catch (err) {
		res.status(404).json({ message: err })
	}
})

// Delete single file by ID
filesController.delete('/:fileId', async (req, res) => {
	try {
		const deletedFile = await FileModel.remove({ _id: req.params.fileId });
		res.status(200).json(deletedFile);
	} catch (err) {
		res.status(404).json({ message: err });
	}
})

// Update single file name by ID
filesController.patch('/:fileId', async (req, res) => {
	try {
		const updatedFile = await FileModel.updateOne({ _id: req.params.fileId },
			{ $set: { fileName: req.body.fileName } });
		res.status(200).json(updatedFile);
	} catch (err) {
		res.status(404).json({ message: err });
	}
})

// List all files in root directory
filesController.get('/:directory', async (req, res) => {
	try {
		const files = await FileModel.find();
		res.status(200).json(files);
	} catch (err) {
		res.status(404).json({ message: err });
	}
});

// List all files
filesController.get('/', async (req, res) => {
	try {
		const allFiles = await FileModel.find();
		res.status(200).json(allFiles);
	} catch (err) { 
		res.status(404).json({ message: err });
	}
});

export default filesController;