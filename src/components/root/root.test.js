import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Root from './root';
import { mount } from 'enzyme';

/**
 * Test cases:
 * 1. Should render self div with ".root" class.
 * 2. Should render RouteCreator component.
 * */

describe('Root Component test', () => {
    let mountedRoot, store;
    const initialState = { points: [] };
    const mockStore = configureStore();

    const mountRoot = () => {
        return mount(
            <Provider store={ store }>
                <Root />
            </Provider>);
    };

    beforeEach(() => {
        store = mockStore(initialState);
        mountedRoot = mountRoot();
    });

    it('Should render self div with ".root" class', () => {
        let divs = mountedRoot.find('div.root');
        expect(divs.length).toBe(1);
    });

    it('Should render RouteCreator component', () => {
        expect(mountedRoot.find('RouteCreator').length).toBe(1);
    });
});
