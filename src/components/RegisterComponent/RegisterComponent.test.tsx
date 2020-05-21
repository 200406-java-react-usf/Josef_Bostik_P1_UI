import * as React from 'react';
import RegisterComponent, { IRegisterProps } from './RegisterComponent';
import { User } from '../../models/user';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

/* Default Properties for rendering RegisterComponent*/
/* 
   RegisterComponent is dependent on these properties, so they must
   be supplied.
*/
const props: IRegisterProps = {
    authUser: undefined,
    setAuthUser: jest.fn()
}

configure({adapter: new Adapter()});

describe('<RegisterComponent />', () => {

    it('Renders without error', () => {
        // Shallowly render the RegisterComponent with properties
        const wrapper = shallow(<RegisterComponent {...props}/>)

        // Expect that the component should render and contain content
        expect(wrapper.exists()).toBeTruthy
    });
})