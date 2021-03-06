import { expect } from 'chai';
import { executeGenerator } from '../helper';

describe('side-effects', () => {
	describe('webapi', () => {
		function getMockedWebApiSideEffect(status, ret) {
			let servicesInjector = require('inject!../../src/side_effects/webapi');
			return servicesInjector({
				'../helpers/fetch': {
					fetchData: (path, method) => {
						return {
							status,
							json: () => {
								return ret;
							}
						}
					},
					isErrorResponse: (response) => {
						return (response.status >= 400);
					}
				}
			});
		}

		it('should load webapi details from server', () => {
			let returnedSelectedPathDetails = {
				details: {

				},
				definitions: {

				}
			};

			let webapi = getMockedWebApiSideEffect(200, returnedSelectedPathDetails);
			let generator = webapi.handleSelectWebApiPath({ payload: {
				path: [ 'pet', '{id}' ]
			} });

			let ret = executeGenerator(generator);

			let dispatches = ret.dispatches;
			expect(dispatches).to.have.length(1);
			let dispatch1 = dispatches[0];
			expect(dispatch1.type).to.equal('WEBAPI_PATH_SELECTED');
			let payload1 = dispatch1.payload;
			expect(payload1.path).to.equal('/pet/{id}');
			expect(payload1.details).not.to.be.null;
			expect(payload1.details).not.to.be.undefined;
			expect(payload1.definitions).not.to.be.null;
			expect(payload1.definitions).not.to.be.undefined;
		});

		it('should use the already selected webapi details', () => {
			let webapi = getMockedWebApiSideEffect();
			let generator = webapi.handleSelectWebApiPath({ payload: {
				path: [ 'pet', '{id}' ]
			} });

			let ret = executeGenerator(generator, {
				selection: {
					path: '/pet/{id}',
					details: {

					},
					definitions: {

					}
				}
			});

			let dispatches = ret.dispatches;
			expect(dispatches).to.have.length(0);
		});

		it('should dispatch not found if the resource don\'t exist', () => {
			let returnedSelectedPathDetails = {
				details: {

				},
				definitions: {

				}
			};

			let webapi = getMockedWebApiSideEffect(404, returnedSelectedPathDetails);
			let generator = webapi.handleSelectWebApiPath({ payload: {
				path: [ 'pet1', '{id}' ]
			} });

			let ret = executeGenerator(generator);

			let dispatches = ret.dispatches;
			expect(dispatches).to.have.length(1);
			let dispatch1 = dispatches[0];
			expect(dispatch1.type).to.equal('WEBAPI_PATH_NOT_FOUND');
		});
	});
});