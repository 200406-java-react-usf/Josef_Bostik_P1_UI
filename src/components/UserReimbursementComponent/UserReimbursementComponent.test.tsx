import * as React from 'react';
import UserReimbursementComponent, { IReimbursementProps } from './UserReimbursementComponent';
import { User } from '../../models/user';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

/* Default Properties for rendering RegisterComponent*/
/* 
   RegisterComponent is dependent on these properties, so they must
   be supplied.
*/
const props: IReimbursementProps = {
    authUser: new User(1, "aanderson", "password", "Alex", "Anderson", "aanderson@gmail.com", "Admin"),
    setAuthUser: jest.fn()
}

configure({adapter: new Adapter()});

describe('<UserReimbursementComponent />', () => {

    it('Renders without error', () => {
        // Shallowly render the RegisterComponent with properties
        const wrapper = shallow(<UserReimbursementComponent {...props}/>)

        // Expect that the component should render and contain content
        expect(wrapper.exists()).toBeTruthy
    });
})