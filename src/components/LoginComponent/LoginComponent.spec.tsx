import * as React from 'react';
import { configure, mount, render, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import LoginComponent, { ILoginProps } from './LoginComponent';
import Adapter from 'enzyme-adapter-react-16';
import { FormControl } from '@material-ui/core';
import { User } from '../../models/user';
import * as mockRemote from '../../remote/auth-service';
import { register } from '../../serviceWorker';

configure({adapter: new Adapter()});

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState]

jest.mock('../../remote/auth-service', () => {

    return {
        authenticate: jest.fn()
    };
});

beforeEach(() => {
    (props.setAuthUser as jest.Mock).mockClear();
    (mockRemote.authenticate as jest.Mock).mockClear();
})

afterEach(() => {
    jest.clearAllMocks();
});

const props: ILoginProps = {
    authUser: undefined,
    setAuthUser: jest.fn()
};

const loginComponent = <LoginComponent {...props} />

describe('LoginComponent', () => {

    // When setState is called, we will be able to spy
    // on that action, as we will provide the setState function
    // as a mock function
    // Note: Doing this will break the tests that check
    // input fields.
    const setState = jest.fn();
    const useStateMock: any = (init: any) => [init, setState];

    it('Should render', () => {
        const wrapper = shallow(loginComponent);
        expect(wrapper.exists()).toBeTruthy();
    })

    it('Should render 2 FormControls', () => {
        const wrapper = mount(loginComponent);
        expect(wrapper.find(FormControl)).toHaveLength(2)
    })

    it('Should render 2 input fields', () => {
        const wrapper = mount(loginComponent);
        expect(wrapper.find('input')).toHaveLength(2);
    });

    it('Should render a button', () => {
        const wrapper = mount(loginComponent);
        expect(wrapper.find('button')).toHaveLength(1)
    });

    it('Having not clicked button, registerAction should not have been called', () => {
        const wrapper = mount(loginComponent);
        expect(props.setAuthUser).not.toHaveBeenCalled();
    });

    it('Typing into input.username trigger state hook on username', () => {
        let wrapper = mount(loginComponent);
        wrapper.find('input#username').simulate('change', {
            target: { value: 'top-secret' }
        });
        expect(wrapper.find('input#username').prop('value')).toEqual('top-secret');
    });

    // // it('Typing into input.username should reflect in username state', () => {
    // //     jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    // //     let wrapper = mount(registerComponent);
    // //     wrapper.find('input#username').simulate('change', {
    // //         target: { value: 'top-secret' }
    // //     });
    // //     expect(setState).toHaveBeenCalledWith('top-secret');
    // // });

    it('Typing into input.password trigger state hook on password', () => {
        let wrapper = mount(loginComponent);
        wrapper.find('input#password').simulate('change', {
            target: { value: 'top-secret' }
        });
        expect(wrapper.find('input#password').prop('value')).toEqual('top-secret');
    });

    it('', () => {
        //jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        let wrapper = mount(loginComponent);
        (mockRemote.authenticate as jest.Mock).mockReturnValue(loginComponent);
        wrapper.find('input#username').simulate('change', {
            target: { value: 'top-secret' }
        });
        wrapper.find('input#password').simulate('change', {
            target: { value: 'top-secret' }
        });
        expect(wrapper.find('input#username').prop('value')).toEqual('top-secret');
        expect(wrapper.find('input#password').prop('value')).toEqual('top-secret');
        wrapper.find('button#submitButton').simulate('click', {});
        expect(mockRemote.authenticate).toHaveBeenCalled();
    })

    // it('Typing into input.confirmedPassword trigger state hook on confirmedPassword', () => {
    //     let wrapper = mount(registerComponent);
    //     wrapper.find('input#confirmedPassword').simulate('change', {
    //         target: { value: 'top-secret' }
    //     });
    //     expect(wrapper.find('input#confirmedPassword').prop('value')).toEqual('top-secret');
    // });

    
    // it('Typing into input.firstName should reflect in firstName state', () => {
    //     jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    //     let wrapper = mount(registerComponent);
    //     wrapper.find('input#firstName').simulate('change', {
    //         target: { value: 'top-secret' }
    //     });
    //     expect(setState).toHaveBeenCalledWith('top-secret');
    // });


    // it('Typing into input.lastName should reflect in lastName state', () => {
    //     jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    //     let wrapper = mount(registerComponent);
    //     wrapper.find('input#lastName').simulate('change', {
    //         target: { value: 'Anonymous' }
    //     });
    //     expect(setState).toHaveBeenCalledWith('Anonymous');
    // });

    // it('Typing into input.email trigger state hook on email', () => {
    //     let wrapper = mount(registerComponent);
    //     wrapper.find('input#email').simulate('change', {
    //         target: { value: 'top-secret' }
    //     });
    //     expect(setState).toHaveBeenCalledWith('top-secret');
    // });

    describe('Login Test', () => {

        it('Submit button successfully calls login & performs a successful login', () => {
            let wrapper = mount(loginComponent);
            (mockRemote.authenticate as jest.Mock).mockReturnValue(loginComponent);
            wrapper.find('input#username').simulate('change', {
                target: { value: 'top-secret' }
            });
            wrapper.find('input#password').simulate('change', {
                target: { value: 'top-secret' }
            });
            expect(wrapper.find('input#username').prop('value')).toEqual('top-secret');
            expect(wrapper.find('input#password').prop('value')).toEqual('top-secret');
            wrapper.find('button#submitButton').simulate('click', {});
            expect(mockRemote.authenticate).toHaveBeenCalled();
        });

        it('Submit button successfully calls login, but fails due to the lack of a provided username', () => {
            let wrapper = mount(loginComponent);
            (mockRemote.authenticate as jest.Mock).mockReturnValue(loginComponent);
            wrapper.find('input#password').simulate('change', {
                target: { value: 'top-secret' }
            });
            expect(wrapper.find('input#password').prop('value')).toEqual('top-secret');
            wrapper.find('button#submitButton').simulate('click', {});
            expect(mockRemote.authenticate).not.toHaveBeenCalled();
        });

        it('Submit button successfully calls login, but fails due to the lack of a provided password', () => {
            let wrapper = mount(loginComponent);
            (mockRemote.authenticate as jest.Mock).mockReturnValue(loginComponent);
            wrapper.find('input#username').simulate('change', {
                target: { value: 'top-secret' }
            });
            expect(wrapper.find('input#username').prop('value')).toEqual('top-secret');
            wrapper.find('button#submitButton').simulate('click', {});
            expect(mockRemote.authenticate).not.toHaveBeenCalled();
        });

        it('Submit button successfully calls login, but authenticate throws an error', () => {
            let wrapper = mount(loginComponent);
            (mockRemote.authenticate as jest.Mock).mockImplementation(() => {
                throw new Error();
            });
            wrapper.find('input#username').simulate('change', {
                target: { value: 'top-secret' }
            });
            wrapper.find('input#password').simulate('change', {
                target: { value: 'top-secret' }
            });
            expect(wrapper.find('input#username').prop('value')).toEqual('top-secret');
            expect(wrapper.find('input#password').prop('value')).toEqual('top-secret');
            wrapper.find('button#submitButton').simulate('click', {});
            expect(mockRemote.authenticate).toHaveBeenCalled();
        });

        // it('Submit button successfully calls register with a taken username or password', () => {
        //     jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        //     let wrapper = mount(registerComponent);
        //     let response = { status:409 };
        //     (mockRemote.createNewUser as jest.Mock).mockReturnValue(response);
        //     wrapper.find('button#submitButton').simulate('click', {});
        //     expect(mockRemote.createNewUser).toHaveBeenCalled();
        //     //expect(setState).toHaveBeenCalledTimes(2);
        // });

        // it('Submit button successfully calls register with invalid input', () => {
        //     jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        //     let wrapper = mount(registerComponent);
        //     let response = { status:400 };
        //     (mockRemote.createNewUser as jest.Mock).mockReturnValue(response);
        //     wrapper.find('button#submitButton').simulate('click', {});
        //     expect(mockRemote.createNewUser).toHaveBeenCalled();
        //     //expect(setState).toHaveBeenCalledTimes(2);
        // });

        // it('Submit button successfully calls register & triggers a general failure', () => {
        //     jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        //     let wrapper = mount(registerComponent);
        //     let response = { status:500 };
        //     (mockRemote.createNewUser as jest.Mock).mockReturnValue(response);
        //     wrapper.find('button#submitButton').simulate('click', {});
        //     expect(mockRemote.createNewUser).toHaveBeenCalled();
        //     //expect(setState).toHaveBeenCalledTimes(2);
        // });

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