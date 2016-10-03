import express from 'express';
import request from 'supertest';

import webapiMiddleware from './webapi';

const app = express();
const port = process.env.PORT || 3000;

loadWebApi();

app.use('/api', webapiMiddleware);

describe('server', () => {
	describe('webapi', () => {
		request(app)
        	.get('/api/books')
        	.expect('Content-Type', /json/)
        	.expect('Content-Length', '4')
        	.expect(200, "ok")
        	.end(function(err, res){
           if (err) throw err;
        });
	});
});