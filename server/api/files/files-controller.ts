import { Router } from 'express'
import fileUpload, {UploadedFile} from 'express-fileupload'

import mongoose from 'mongoose'

import { AuthenticatedUserRequest } from '../../interfaces/user';
import { verifyToken } from '../../middleware/auth';

import { DirectoryModel } from '../../models/directory.model';
import { FileModel } from '../../models/file.model';

import { join, resolve } from 'path';

const filesController = Router();

filesController.post('/upload/:fileId', verifyToken, fileUpload(), async (req: AuthenticatedUserRequest, res) => {
	const uploadedFile = req.files.file as UploadedFile;
	const fileId = req.params.fileId;
	const nameSplit = uploadedFile.name.split('.');

	const extention = nameSplit.splice(-1,1).pop();
	const fileName = nameSplit.join('.');

	const downloadPath = join(resolve(), 'upload-files', `${fileName}-${fileId}.${extention}`);

	try {
		uploadedFile.mv(downloadPath, (err) => {
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(204).json({ 
				fileName: uploadedFile.name
			});
		})
	} catch (e) {
		return res.status(500).json({message: 'There was an error uploading your file'})
	}
});

filesController.get('/:fileName/:fileId', verifyToken, (req: AuthenticatedUserRequest, res) => {

	const {fileName, fileId}= req.params;
	const nameSplit = fileName.split('.');

	const extention = nameSplit.splice(-1,1).pop();
	const fileNameWithoutExtention = nameSplit.join('.');

	const filePath = join(resolve(), 'upload-files', `${fileNameWithoutExtention}-${fileId}.${extention}`);
	res.download(filePath);
});

// Upload new file
filesController.post('/upload', verifyToken, async (req: AuthenticatedUserRequest, res) => {
	const ownerId = req.user.id;
	const directoryId = req.body.directoryId;
	const extention = req.body.extention;
	const directory = await DirectoryModel.findOne({ id: directoryId });
	if (!directory) {
		return res.status(404).json({error: 'No such directory'});
	}
	
	const file = new FileModel({
		id: new mongoose.Types.ObjectId(),
		fileName: req.body.fileName,
		directory: directoryId,
		ownerId,
		extention 
	});

	const validation = file.validateSync();
	if (validation) {
		return res.status(400).json(validation);
	} 

	try {
		const savedFile = await file.save();
		await directory.updateOne({$push: { files: savedFile } });
		res.status(201).json(savedFile);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

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
filesController.delete('/:directoryId/:fileId', async (req, res) => {
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