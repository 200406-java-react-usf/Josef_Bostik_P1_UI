import * as React from 'react';
import { configure, mount, render, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import HomeComponent, { IHomeProps } from './HomeComponent';
import Adapter from 'enzyme-adapter-react-16';
import { FormControl } from '@material-ui/core';
import { User } from '../../models/user';
import { register } from '../../serviceWorker';

configure({adapter: new Adapter()});

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState]


beforeEach(() => {
})

afterEach(() => {
    jest.clearAllMocks();
});

const props: IHomeProps = {
    username: ""
};

const homeComponent = <HomeComponent {...props} />

describe('HomeComponent', () => {

    // When setState is called, we will be able to spy
    // on that action, as we will provide the setState function
    // as a mock function
    // Note: Doing this will break the tests that check
    // input fields.
    const setState = jest.fn();
    const useStateMock: any = (init: any) => [init, setState];

    it('Should render', () => {
        const wrapper = shallow(homeComponent);
        expect(wrapper.exists()).toBeTruthy();
    })

})