import * as React from 'react';
import { configure, mount, render, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import ManagerReimbursementComponent, { IReimbursementProps } from './ManagerReimbursementComponent';
import Adapter from 'enzyme-adapter-react-16';
import { FormControl, Table } from '@material-ui/core';
import { User } from '../../models/user';
import { Reimbursement } from '../../models/reimbursements';
import * as mockRemote from '../../remote/get-all-reimbursements';
import * as mockRemote2 from '../../remote/update-reimbursement-status'
import * as mockRemote3 from '../../remote/create-new-reimbursement'
import { register } from '../../serviceWorker';

configure({adapter: new Adapter()});

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState]

jest.mock('../../remote/get-all-reimbursements', () => {

    return {
        getReimbursements: jest.fn()
    };
});

jest.mock('../../remote/update-reimbursement-status', () => {

    return {
        updateReimbursementStatus: jest.fn()
    };
});

jest.mock('../../remote/create-new-reimbursement', () => {

    return {
        createNewReimbursement: jest.fn()
    };
});
// let useEffect: any;

// const mockUseEffect = () => {
//     useEffect.mockImplementationOnce((f: any) => f());
// }

beforeEach(() => {
    //useEffect = jest.spyOn(React, "useEffect");
    (props.setAuthUser as jest.Mock).mockClear();
    (mockRemote.getReimbursements as jest.Mock).mockClear();
    (mockRemote2.updateReimbursementStatus as jest.Mock).mockClear();
    (mockRemote3.createNewReimbursement as jest.Mock).mockClear();
    //mockUseEffect();
})

afterEach(() => {
    jest.clearAllMocks();
});

const props: IReimbursementProps = {
    authUser: new User(1, "aanderson", "password", "Alex", "Anderson", "aanderson@gmail.com", "Admin"),
    setAuthUser: jest.fn()
};

const managerReimbursementComponent = <ManagerReimbursementComponent {...props} />

describe('ManagerReimbursementComponent', () => {

    // When setState is called, we will be able to spy
    // on that action, as we will provide the setState function
    // as a mock function
    // Note: Doing this will break the tests that check
    // input fields.
    const setState = jest.fn();
    const useStateMock: any = (init: any) => [init, setState];

    it('Should render', () => {
        const wrapper = shallow(managerReimbursementComponent);
        expect(wrapper.exists()).toBeTruthy();
    })

    it('Should render a table', () => {
        const wrapper = mount(managerReimbursementComponent);
        expect(wrapper.find(Table)).toHaveLength(1)
    })

    it('Should render 2 select fields', () => {
        const wrapper = mount(managerReimbursementComponent);
        expect(wrapper.find('select')).toHaveLength(2);
    });

    it('Should render a button', () => {
        const wrapper = mount(managerReimbursementComponent);
        expect(wrapper.find('button')).toHaveLength(1)
    });

    it('Having not clicked button, registerAction should not have been called', () => {
        const wrapper = mount(managerReimbursementComponent);
        expect(props.setAuthUser).not.toHaveBeenCalled();
    });

    it('selecting in select.typeSelect trigger state hook on type', () => {
        let wrapper = mount(managerReimbursementComponent);
        wrapper.find('select#typeSelect').simulate('change', {
            target: { value: '1' }
        });
        expect(wrapper.find('select#typeSelect').prop('value')).toEqual('1');
    });

    it('selecting in select.statusSelect trigger state hook on status', () => {
        let wrapper = mount(managerReimbursementComponent);
        wrapper.find('select#statusSelect').simulate('change', {
            target: { value: '1' }
        });
        expect(wrapper.find('select#statusSelect').prop('value')).toEqual('1');
    });

    it('getAllReimbursements is rendered on page load', () => {
        let mockResponse = {status: 200, data: {}};
        (mockRemote.getReimbursements as jest.Mock).mockReturnValue(mockResponse);
        let wrapper = mount(managerReimbursementComponent);
        expect(mockRemote.getReimbursements).toHaveBeenCalledTimes(1);
    });

})