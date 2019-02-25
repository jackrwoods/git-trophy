/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-02-25T12:04:05-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-02-25T14:44:51-08:00
 */

// Copy everything below and put it into your test file
import React from 'react' // Import react
// eslint-disable-next-line
import { shallow, mount, render, configure } from 'enzyme'// need to import the renderer
import Adapter from 'enzyme-adapter-react-15'
configure({ adapter: new Adapter() })
// quit copying here

// eslint-disable-next-line
import TrophyModel from '../src/components/TrophyModel.js' // import the componenet to be tested

test('Can get the base', () => {
  const fakeData = new Array(52).fill(2) // make some fake data to test against
  // render the component, do this is every test (no bleeding into other tests)
  const component = shallow(
    <TrophyModel entity='Broha22' year='2018' data={fakeData} />).instance()

  // I wouldnt recommend snapshots they are too specific
  // expect(component.getBase()).toMatchSnapshot() // test against the snap folder located in __snapshots__

  // We really just seeing if it can make the object not even looking to see details about, this should probs test more.
  expect(component.getBase())
})
