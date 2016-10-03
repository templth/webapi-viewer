import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import DefaultPage from '../../../src/components/default';

describe('components', () => {
	describe('default', () => {
		it('should display a message', () => {
			let wrapper = shallow(<DefaultPage />);

			expect(wrapper.text()).to.equal('Pleased select a path above.');
		});
	});
});