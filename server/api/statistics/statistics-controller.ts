import { Router } from 'express';

import { AuthenticatedUserRequest } from '../../interfaces/user';
import { verifyToken } from '../../middleware/auth';
import { FileModel } from '../../models/file.model';

const statisticsController = Router();

statisticsController.get('/files', verifyToken, async (req: AuthenticatedUserRequest, res) => {
	const userId: string = req.user.id;

	const filesCount: number = await FileModel.countDocuments({ owner: userId });

	return res.json({
		filesCount
	});
});

statisticsController.get('/files-this-week', verifyToken, async (req: AuthenticatedUserRequest, res) => {
	const userId: string = req.user.id;

	const oneWeekAgo: Date = new Date(new Date().setDate(new Date().getDate() - 7));
	const filesCount: number = await FileModel.countDocuments({ owner: userId, created: { $gte: oneWeekAgo } });

	return res.json({
		filesCount
	});
});

statisticsController.get('/shares', verifyToken, (req: AuthenticatedUserRequest, res) => {
	// return the number of shared files;
});

export default statisticsController;
