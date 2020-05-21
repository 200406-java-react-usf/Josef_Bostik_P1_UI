import * as React from 'react';
import AdminUserComponent, { IUserProps } from './AdminUserComponent';
import { User } from '../../models/user';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

/* Default Properties for rendering AdminUserComponent*/
/* 
   AdminUserComponent is dependent on these properties, so they must
   be supplied.
*/
const props: IUserProps = {
    authUser: new User(1, "aanderson", "password", "Alex", "Anderson", "aanderson@gmail.com", "Admin"),
    setAuthUser: jest.fn()
}

configure({adapter: new Adapter()});

describe('<AdminUserComponent />', () => {

    it('Renders without error', () => {
        // Shallowly render the AdminUserComponent with properties
        const wrapper = shallow(<AdminUserComponent {...props}/>)

        // Expect that the component should render and contain content
        expect(wrapper.exists()).toBeTruthy
    });
})