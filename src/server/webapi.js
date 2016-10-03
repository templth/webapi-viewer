import express from 'express';

import { getWebApiResource, getDefinitions } from '../server/webapi_service';

var router = express.Router();

export default router;

router.get('*', (req, res, next) => {
	let details = getWebApiResource(decodeURIComponent(req.path));
	let definitions = getDefinitions();
	if (details) {
		res.json({ details, definitions });
	} else {
		res.sendStatus(404);
	}
});