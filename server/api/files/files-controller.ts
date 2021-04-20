
import { Router } from 'express'
import { verifyToken } from '../../middleware/auth';


const filesController = Router();

filesController.get('/file', verifyToken, (req, res) => {
	res.status(200).send('Nice file!')
})

export default filesController;