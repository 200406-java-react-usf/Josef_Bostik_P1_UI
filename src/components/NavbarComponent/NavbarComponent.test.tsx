import * as React from 'react';
import NavbarComponent, { INavbarProps } from './NavbarComponent';
import { User } from '../../models/user';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

/* Default Properties for rendering NavbarComponent*/
/* 
   NavbarComponent is dependent on these properties, so they must
   be supplied.
*/
const props: INavbarProps = {
    authUser: undefined
}

configure({adapter: new Adapter()});

describe('<NavbarComponent />', () => {

    it('Renders without error', () => {
        // Shallowly render the NavbarComponent with properties
        const wrapper = shallow(<NavbarComponent {...props}/>)

        // Expect that the component should render and contain content
        expect(wrapper.exists()).toBeTruthy
    });
})