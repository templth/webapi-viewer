import express from 'express';

import reactMiddleware from './react';
import { loadWebApi } from './webapi_service';
import webapiMiddleware from './webapi';

const app = express();
const port = process.env.PORT || 3000;

loadWebApi();

export default app;

app.use('/favicon.ico', (req, res, next) => {
    res.sendStatus(404);
});
app.use('/api', webapiMiddleware);
app.use(reactMiddleware);

app.listen(port);
