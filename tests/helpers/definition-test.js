import { expect } from 'chai';

import {
	hasSchemaRef, getSchemaName, isCompositeProperty,
	isArrayProperty, isSimpleProperty, getPropertyType
} from '../../src/helpers/definition';

describe('helpers', () => {
	describe('definition', () => {
		it('should have a schema ref', () => {
			let type = {
				$ref: '#/definitions/Category'
			};
			expect(hasSchemaRef(type)).not.to.be.null;
			expect(hasSchemaRef(type)).not.to.be.undefined;
		});

		it('shouldn\'t have a schema ref', () => {
			let type = {
				type: 'integer'
			};
			expect(hasSchemaRef(type)).to.be.undefined;
		});

		it('should have a schema ref for an array', () => {
			let type = {
				type: 'array',
				items: {
					$ref: '#/definitions/Category'
				}
			};
			expect(hasSchemaRef(type)).not.to.be.null;
			expect(hasSchemaRef(type)).not.to.be.undefined;
		});

		it('shouldn\'t have a schema ref for an array', () => {
			let type = {
				type: 'array',
				items: {
					type: 'integer'
				}
			};
			expect(hasSchemaRef(type)).to.be.undefined;
		});

		it('should return the schema name', () => {
			let type = {
				$ref: '#/definitions/Category'
			};
			expect(getSchemaName(type)).to.equal('Category');
		});

		it('should return the schema name for an array', () => {
			let type = {
				type: 'array',
				items: {
					$ref: '#/definitions/Category'
				}
			};
			expect(getSchemaName(type)).to.equal('Category');
		});

		it('should detect composite', () => {
			let type = {
				$ref: '#/definitions/Category'
			};
			expect(isCompositeProperty(type)).to.be.true;
			expect(isArrayProperty(type)).to.be.false;
			expect(isSimpleProperty(type)).to.be.false;
		});

		it('should detect composite for an array', () => {
			let type = {
				type: 'array',
				items: {
					$ref: '#/definitions/Category'
				}
			};
			expect(isCompositeProperty(type)).to.be.true;
			expect(isArrayProperty(type)).to.be.true;
			expect(isSimpleProperty(type)).to.be.false;
		});

		it('should detect simple', () => {
			let type = {
				type: 'integer'
			};
			expect(isCompositeProperty(type)).to.be.false;
			expect(isArrayProperty(type)).to.be.false;
			expect(isSimpleProperty(type)).to.be.true;
		});

		it('should detect simple for an array', () => {
			let type = {
				type: 'array',
				items: {
					type: 'integer'
				}
			};
			expect(isCompositeProperty(type)).to.be.false;
			expect(isArrayProperty(type)).to.be.true;
			expect(isSimpleProperty(type)).to.be.false;
		});

		it('should return composite type', () => {
			let type = {
				$ref: '#/definitions/Category'
			};
			expect(getPropertyType(type)).to.equal('Category');
		});

		it('should return composite type for an array', () => {
			let type = {
				type: 'array',
				items: {
					$ref: '#/definitions/Category'
				}
			};
			expect(getPropertyType(type)).to.equal('Category');
		});

		it('should return simple type', () => {
			let type = {
				type: 'integer'
			};
			expect(getPropertyType(type)).to.equal('integer');
		});

		it('should return simple for an array', () => {
			let type = {
				type: 'array',
				items: {
					type: 'integer'
				}
			};
			expect(getPropertyType(type)).to.equal('integer');
		});
	});
});