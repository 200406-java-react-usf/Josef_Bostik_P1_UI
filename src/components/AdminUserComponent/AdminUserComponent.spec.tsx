import * as React from 'react';
import { configure, mount, render, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import AdminUserComponent, { IUserProps } from './AdminUserComponent';
import Adapter from 'enzyme-adapter-react-16';
import { FormControl } from '@material-ui/core';
import { User } from '../../models/user';
import * as mockRemote from '../../remote/get-all-users';
import * as mockRemote2 from '../../remote/delete-user';
import { register } from '../../serviceWorker';

configure({adapter: new Adapter()});

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState]

jest.mock('../../remote/get-all-users', () => {

    return {
        getUsers : jest.fn()
    };
});

jest.mock('../../remote/delete-user', () => {

    return {
        delUser : jest.fn()
    };
});

beforeEach(() => {
    (props.setAuthUser as jest.Mock).mockClear();
    (mockRemote.getUsers as jest.Mock).mockClear();
    (mockRemote2.delUser as jest.Mock).mockClear();
})

afterEach(() => {
    jest.clearAllMocks();
});

const props: IUserProps = {
    authUser: new User(1, "aanderson", "password", "Alex", "Anderson", "aanderson@gmail.com", "Admin"),
    setAuthUser: jest.fn()
};

const adminUserComponent = <AdminUserComponent {...props} />

describe('AdminUserComponent', () => {

    // When setState is called, we will be able to spy
    // on that action, as we will provide the setState function
    // as a mock function
    // Note: Doing this will break the tests that check
    // input fields.
    const setState = jest.fn();
    const useStateMock: any = (init: any) => [init, setState];

    it('Should render', () => {
        const wrapper = shallow(adminUserComponent);
        expect(wrapper.exists()).toBeTruthy();
    })

    it('getAllUsers is rendered on page load', () => {
        let mockResponse = {status: 200, data: {}};
        (mockRemote.getUsers as jest.Mock).mockReturnValue(mockResponse);
        let wrapper = mount(adminUserComponent);
        expect(mockRemote.getUsers).toHaveBeenCalledTimes(1);
    });

    it('Delete button successfully calls register & performs a successful delete', () => {
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        let wrapper = mount(adminUserComponent);
        let response = { status:204 };
        (mockRemote2.delUser as jest.Mock).mockReturnValue(response);
        wrapper.find('button#deleteButton').simulate('click', {});
        expect(mockRemote2.delUser).toHaveBeenCalled();
        //expect(setState).toHaveBeenCalledTimes(2);
    });

})

const props2: IUserProps = {
    authUser: new User(1, "aanderson", "password", "Alex", "Anderson", "aanderson@gmail.com", "User"),
    setAuthUser: jest.fn()
};

const adminUserComponent2 = <AdminUserComponent {...props2} />

describe('Non-AdminUserComponent', () => {
    it('Should render', () => {
        const wrapper = shallow(adminUserComponent2);
        expect(wrapper.exists()).toBeTruthy();
    })
})