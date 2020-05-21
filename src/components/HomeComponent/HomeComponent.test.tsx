import * as React from 'react';
import HomeComponent, { IHomeProps } from './HomeComponent';
import { User } from '../../models/user';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

/* Default Properties for rendering RegisterComponent*/
/* 
   ManagerRegisterComponent is dependent on these properties, so they must
   be supplied.
*/
const props: IHomeProps = {
    username: ""
}

configure({adapter: new Adapter()});

describe('<HomeComponent />', () => {

    it('Renders without error', () => {
        // Shallowly render the ManagerReimbursementComponent with properties
        const wrapper = shallow(<HomeComponent {...props}/>)

        // Expect that the component should render and contain content
        expect(wrapper.exists()).toBeTruthy
    });
})