import swaggerParser from 'swagger-parser';

const WEBAPI_SWAGGER_FILE = 'swagger.json';
//const WEBAPI_SWAGGER_FILE = 'api_swagger2.json';
let webApi = null;

export function loadWebApi() {
	swaggerParser.parse(__dirname + `/data/${WEBAPI_SWAGGER_FILE}`).then(api => {
    	webApi = api;
  	}).catch(err => {
  		console.log(err);
  	});
}

export function getWebApiInfo() {
	return {
		swagger: webApi.swagger,
		info: webApi.info,
		host: webApi.host,
		basePath: webApi.basePath
	};
}

export function getWebApiPaths() {
	return Object.keys(webApi.paths);
}

export function getWebApiResource(path) {
	let resource = webApi.paths[path];
	if (!resource) {
		// Handle trailing character
		resource = webApi.paths[path + '/'];
	}
	return resource;
}

export function hasWebApiResource(path) {
	return (getWebApiResource(path) != null);
}

export function getDefinitions(path) {
	return webApi.definitions;
}