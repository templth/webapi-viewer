import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, mount, render } from 'enzyme';
import Bar, { PathsBar } from '../../../src/components/layout/bar';

const mockStore = configureMockStore([]);

describe('components', () => {
	describe('layout', () => {
		describe('bar', () => {
			it('should display a list of paths', () => {
				const store = mockStore({});

				let paths = [ '/test', '/test1', '/test2' ];

				let wrapper = shallow(<PathsBar paths={ paths } />);

				let links = wrapper.find(Link);
				expect(links).to.have.length(3);

				let link1 = links.at(0);
				expect(link1.prop('to')).to.equal('/test');
				expect(link1.children().text()).to.equal('/test');

				let link2 = links.at(1);
				expect(link2.prop('to')).to.equal('/test1');
				expect(link2.children().text()).to.equal('/test1');

				let link3 = links.at(2);
				expect(link3.prop('to')).to.equal('/test2');
				expect(link3.children().text()).to.equal('/test2');
			});

			it('should select the current path', () => {
				const store = mockStore({
					selection: {
						path: '/test'
					}
				});

				let paths = [ '/test', '/test1', '/test2' ];

				let wrapper = mount(<Provider store={ store }>
					<Bar paths={ paths }/>
				</Provider>
				);

				let links = wrapper.find(Link);
				expect(links).to.have.length(3);

				let lis = wrapper.find('li');
				expect(lis).to.have.length(3);
				let li1 = lis.at(0);
				expect(li1.hasClass('selected')).to.equal(true);

				let li2 = lis.at(1);
				expect(li2.hasClass('selected')).to.equal(false);

				let li3 = lis.at(2);
				expect(li3.hasClass('selected')).to.equal(false);
			});
		});
	});
});