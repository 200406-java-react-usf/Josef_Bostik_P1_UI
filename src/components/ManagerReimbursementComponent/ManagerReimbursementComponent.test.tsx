import * as React from 'react';
import ManagerReimbursementComponent, { IReimbursementProps } from './ManagerReimbursementComponent';
import { User } from '../../models/user';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

/* Default Properties for rendering RegisterComponent*/
/* 
   ManagerRegisterComponent is dependent on these properties, so they must
   be supplied.
*/
const props: IReimbursementProps = {
    authUser: new User(1, "aanderson", "password", "Alex", "Anderson", "aanderson@gmail.com", "Admin"),
    setAuthUser: jest.fn()
}

configure({adapter: new Adapter()});

describe('<ManagerReimbursementComponent />', () => {

    it('Renders without error', () => {
        // Shallowly render the ManagerReimbursementComponent with properties
        const wrapper = shallow(<ManagerReimbursementComponent {...props}/>)

        // Expect that the component should render and contain content
        expect(wrapper.exists()).toBeTruthy
    });
})