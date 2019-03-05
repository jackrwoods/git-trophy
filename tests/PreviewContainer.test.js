/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-05T13:29:49-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-05T13:44:53-08:00
 */

import React from 'react' // Import react
// eslint-disable-next-line
import { shallow, mount, render, configure } from 'enzyme'// need to import the renderer
import Adapter from 'enzyme-adapter-react-15'
configure({ adapter: new Adapter() })
// quit copying here

// eslint-disable-next-line
import PreviewContainer from '../src/components/PreviewContainer.js' // import the componenet to be tested

test('Can render PreviewContainer', () => {
  const fakeData = new Array(52).fill({ count: 2, level: 0 })
  const component = shallow(
    <PreviewContainer data={fakeData} entity='Broha22' year='2019' setSceneContainer={() => {}} />).instance()
  expect(component).anything()
})
test('Can render PreviewContainer', () => {
  const fakeData = new Array(52).fill({ count: 2, level: 0 })
  const component = shallow(
    <PreviewContainer data={fakeData} entity='Broha22' year='2019' setSceneContainer={() => {}} />).instance()
  expect(component).anything()
})
