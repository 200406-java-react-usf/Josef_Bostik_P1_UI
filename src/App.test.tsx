import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';

/* 
  Enzyme is being used to render a component in a testable state
  This can be accomplished in a few ways:
  shallow - Which shallowly renders a component for testing. A shallow render
      does not include any child components.
  mount - Mount more deeply renders a component for testing, rendering child
      components defined in the component structure. We will use this app primarily,
      due to the heavy usage of higher components in this app.

  Why can't we just test the app with Jest alone?
  1. Jest is great for testing simple JavaScript.

*/
configure({adapter: new Adapter()});
describe('<App />', () => {
  test('renders learn react link', () => {
    const app = render(<App />);
    //const linkElement = getByText(/learn react/i);
    expect(app).toBeTruthy();
  });

  test('Renders NavBarComponent', () => {
    // Testing wrapper around the rendered component
    // The wrapper exposes accessors to the rendered component for testing
    const wrapper = mount(<App />)

    expect(wrapper.find(NavbarComponent)).toHaveLength(1);
  });
  
})