/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-05T11:29:12-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-05T13:45:31-08:00
 */

import React from 'react' // Import react
// eslint-disable-next-line
import { shallow, mount, render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
configure({ adapter: new Adapter() })
// quit copying here

// eslint-disable-next-line
import App from '../src/components/App.js'

test('Can render the application', () => {
  // eslint-disable-next-line
  const fakeData = new Array(3).fill('2018')
  const component = mount(
    <App />
  ).instance()
  expect(component).anything()
})
