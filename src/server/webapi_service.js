import swaggerParser from 'swagger-parser';

let webApi = null;

export function loadWebApi() {
	swaggerParser.parse(__dirname + '/data/swagger.json').then(api => {
    	webApi = api;
  	}).catch(err => {
  		console.log(err);
  	});
}

export function getWebApiInfo() {
	return webApi.info;
}

export function getWebApiPaths() {
	return Object.keys(webApi.paths);
}

export function getWebApiResource(path) {
	return webApi.paths[path];
}

export function getDefinitions(path) {
	return webApi.definitions;
}