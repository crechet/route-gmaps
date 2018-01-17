import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Root from './root';
import { mount, shallow, render } from 'enzyme';

/**
 * Test cases:
 * 1. Should render self div.
 * 2. Should render RouteCreator component.
 * */

describe('Root Component test', () => {
    let mountedRoot, store;
    const mockStore = configureStore();

    const mountRoot = () => {
        /*return mount(
            <Provider store={ store }>
                <Root />
            </Provider>);*/
        return shallow(<Root />);
    };

    beforeEach(() => {
        mountedRoot = undefined;
        store = mockStore();
        store.points = [];
    });

    it('Should render self', () => {
        let divs = mountRoot().find('div');
        expect(divs.length).toBe(1);
    });

    /*it('Should render RouteCreator component', () => {
        // expect(mountRoot().find('RouteCreator').length).toBe(1);
        // expect(mountRoot().find('h1').length).toBe(1);
        // console.log(mountRoot().find(RouteCreator));
        expect(mountRoot().find('RouteCreator')).to.have.length(1);
    });*/
});
