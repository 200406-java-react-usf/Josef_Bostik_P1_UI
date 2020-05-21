import * as React from 'react';
import { configure, mount, render, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import UserReimbursementComponent, { IReimbursementProps } from './UserReimbursementComponent';
import Adapter from 'enzyme-adapter-react-16';
import { FormControl } from '@material-ui/core';
import { User } from '../../models/user';
import * as mockRemote from '../../remote/get-user-reimbursements';
import * as mockRemote2 from '../../remote/create-new-reimbursement';
import * as mockRemote3 from '../../remote/update-reimbursement';
import { register } from '../../serviceWorker';

configure({adapter: new Adapter()});

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState]

jest.mock('../../remote/get-user-reimbursements', () => {

    return {
        getUserReimbursements: jest.fn()
    };
});

jest.mock('../../remote/create-new-reimbursement', () => {

    return {
        createNewReimbursement: jest.fn()
    };
});

jest.mock('../../remote/update-reimbursement', () => {

    return {
        updateReimbursement: jest.fn()
    };
});

beforeEach(() => {
    (props.setAuthUser as jest.Mock).mockClear();
    (mockRemote.getUserReimbursements as jest.Mock).mockClear();
    (mockRemote2.createNewReimbursement as jest.Mock).mockClear();
    (mockRemote3.updateReimbursement as jest.Mock).mockClear();
})

afterEach(() => {
    jest.clearAllMocks();
});

const props: IReimbursementProps = {
    authUser: new User(1, "aanderson", "password", "Alex", "Anderson", "aanderson@gmail.com", "Admin"),
    setAuthUser: jest.fn()
};

const userReimbursementComponent = <UserReimbursementComponent {...props} />

describe('UserReimbursementComponent', () => {

    // When setState is called, we will be able to spy
    // on that action, as we will provide the setState function
    // as a mock function
    // Note: Doing this will break the tests that check
    // input fields.
    const setState = jest.fn();
    const useStateMock: any = (init: any) => [init, setState];

    it('Should render', () => {
        const wrapper = shallow(userReimbursementComponent);
        expect(wrapper.exists()).toBeTruthy();
    })

    it('Should render 5 FormControls', () => {
        const wrapper = mount(userReimbursementComponent);
        expect(wrapper.find(FormControl)).toHaveLength(5)
    })

    it('Should render 5 input fields', () => {
        const wrapper = mount(userReimbursementComponent);
        expect(wrapper.find('input')).toHaveLength(5);
    });

    it('Should render a button', () => {
        const wrapper = mount(userReimbursementComponent);
        expect(wrapper.find('button')).toHaveLength(2)
    });

    it('Having not clicked button, registerAction should not have been called', () => {
        const wrapper = mount(userReimbursementComponent);
        expect(props.setAuthUser).not.toHaveBeenCalled();
    });

    it('Typing into input.amount trigger state hook on amount', () => {
        let wrapper = mount(userReimbursementComponent);
        wrapper.find('input#amount').simulate('change', {
            target: { value: 'top-secret' }
        });
        expect(wrapper.find('input#amount').prop('value')).toEqual('top-secret');
    });

    it('Typing into input.description trigger state hook on description', () => {
        let wrapper = mount(userReimbursementComponent);
        wrapper.find('input#description').simulate('change', {
            target: { value: 'top-secret' }
        });
        expect(wrapper.find('input#description').prop('value')).toEqual('top-secret');
    });

    it('Typing into input.uid trigger state hook on uid', () => {
        let wrapper = mount(userReimbursementComponent);
        wrapper.find('input#uid').simulate('change', {
            target: { value: 'top-secret' }
        });
        expect(wrapper.find('input#uid').prop('value')).toEqual('top-secret');
    });

    
    it('Typing into input.uAmount should reflect in uAmount state', () => {
        let wrapper = mount(userReimbursementComponent);
        wrapper.find('input#uAmount').simulate('change', {
            target: { value: 'top-secret' }
        });
        expect(wrapper.find('input#uAmount').prop('value')).toEqual('top-secret');
    });


    it('Typing into input.uDescription should reflect in uDescription state', () => {
        let wrapper = mount(userReimbursementComponent);
        wrapper.find('input#uDescription').simulate('change', {
            target: { value: 'top-secret' }
        });
        expect(wrapper.find('input#uDescription').prop('value')).toEqual('top-secret');
    });

    it('getAllUserReimbursements is rendered on page load', () => {
        let mockResponse = {status: 200, data: {}};
        (mockRemote.getUserReimbursements as jest.Mock).mockReturnValue(mockResponse);
        let wrapper = mount(userReimbursementComponent);
        expect(mockRemote.getUserReimbursements).toHaveBeenCalledTimes(1);
    });

    describe('Register Reimbursement Test', () => {

        it('Submit button successfully calls registerReimbursement & performs a successful registration', () => {
            let wrapper = mount(userReimbursementComponent);
            (mockRemote2.createNewReimbursement as jest.Mock).mockReturnValue(201);
            wrapper.find('input#amount').simulate('change', {
                target: { value: 'top-secret' }
            });
            wrapper.find('input#description').simulate('change', {
                target: { value: 'top-secret' }
            });
            expect(wrapper.find('input#amount').prop('value')).toEqual('top-secret');
            expect(wrapper.find('input#description').prop('value')).toEqual('top-secret');
            wrapper.find('button#registerButton').simulate('click', {});
            expect(mockRemote2.createNewReimbursement).toHaveBeenCalled();
        });

        it('Submit button successfully calls registerReimbursement but the reimbursement was not persisted', () => {
            let wrapper = mount(userReimbursementComponent);
            (mockRemote2.createNewReimbursement as jest.Mock).mockReturnValue(201);
            wrapper.find('input#amount').simulate('change', {
                target: { value: 'top-secret' }
            });
            wrapper.find('input#description').simulate('change', {
                target: { value: 'top-secret' }
            });
            expect(wrapper.find('input#amount').prop('value')).toEqual('top-secret');
            expect(wrapper.find('input#description').prop('value')).toEqual('top-secret');
            wrapper.find('button#registerButton').simulate('click', {});
            expect(mockRemote2.createNewReimbursement).toHaveBeenCalled();
        });

        it('Submit button successfully calls registerReimbursement with no provided amount', () => {
            let wrapper = mount(userReimbursementComponent);
            (mockRemote2.createNewReimbursement as jest.Mock).mockReturnValue(201);
            wrapper.find('input#description').simulate('change', {
                target: { value: 'top-secret' }
            });
            expect(wrapper.find('input#description').prop('value')).toEqual('top-secret');
            wrapper.find('button#registerButton').simulate('click', {});
            expect(mockRemote2.createNewReimbursement).not.toHaveBeenCalled();
        });

        it('Submit button successfully calls registerReimbursement with no provided description', () => {
            let wrapper = mount(userReimbursementComponent);
            (mockRemote2.createNewReimbursement as jest.Mock).mockReturnValue(201);
            wrapper.find('input#amount').simulate('change', {
                target: { value: 'top-secret' }
            });
            expect(wrapper.find('input#amount').prop('value')).toEqual('top-secret');
            wrapper.find('button#registerButton').simulate('click', {});
            expect(mockRemote2.createNewReimbursement).not.toHaveBeenCalled();
        });

        
    });

    // /*
    //     Blackbox Testing - Testing only input/output and side effects where
    //             necessary
    //     Whitebox Testing - Testing internal behavior that you would not see
    //             from the outside. 
    // */

    // describe('state management', () => {

    //     afterEach(() => {
    //         jest.clearAllMocks();
    //     });

    //     it('calls setState when #firstName changed', () => {
    //         jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    //         const wrapper = mount(registerComponent);

    //         wrapper.find('input#firstName').simulate('change', {
    //             target: {value: 'Abby'}
    //         });
    //         expect(setState).toHaveBeenLastCalledWith('Abby');

    //     });

    //     it('calls setState when #lastName changed', () => {
    //         jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    //         const wrapper = mount(registerComponent);

    //         wrapper.find('input#lastName').simulate('change', {
    //             target: {value: 'lastName'}
    //         });
    //         expect(setState).toHaveBeenCalledWith('lastName');
    //     });
    // })
})