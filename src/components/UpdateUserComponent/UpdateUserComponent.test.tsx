import * as React from 'react';
import UpdateUserComponent, { IUserProps } from './UpdateUserComponent';
import { User } from '../../models/user';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

/* Default Properties for rendering RegisterComponent*/
/* 
   RegisterComponent is dependent on these properties, so they must
   be supplied.
*/
const props: IUserProps = {
    authUser: new User(1, "aanderson", "password", "Alex", "Anderson", "aanderson@gmail.com", "Admin"),
    setAuthUser: jest.fn()
}

configure({adapter: new Adapter()});

describe('<UpdateUserComponent />', () => {

    it('Renders without error', () => {
        // Shallowly render the RegisterComponent with properties
        const wrapper = shallow(<UpdateUserComponent {...props}/>)

        // Expect that the component should render and contain content
        expect(wrapper.exists()).toBeTruthy
    });
})