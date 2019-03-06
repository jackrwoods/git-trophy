/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-02-25T12:04:05-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-05T11:09:20-08:00
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

test('Can render the model', () => {
  const fakeData = new Array(52).fill(2) // make some fake data to test against
  // render the component, do this is every test (no bleeding into other tests)
  const component = shallow(
    <TrophyModel entity='Broha22' year='2018' data={fakeData} />).instance()

  // I wouldnt recommend snapshots they are too specific
  // expect(component.getBase()).toMatchSnapshot() // test against the snap folder located in __snapshots__

  // We really just seeing if it can make the object not even looking to see details about, this should probs test more.
  expect(component.props.entity).toBe('Broha22')
  expect(component.props.year).toBe('2018')
  expect(component.props.data).toBe(fakeData)
})

test('Can get the base', () => {
  const fakeData = new Array(52).fill(2)
  const component = shallow(
    <TrophyModel entity='Broha22' year='2018' data={fakeData} />).instance()

  const baseInstance = component.getBase()
  expect(baseInstance.props.position.x).toBe((Math.ceil(52 / 7) / 7) / 2 - 3 / 14)
  expect(baseInstance.props.position.y).toBe(0)
  expect(baseInstance.props.position.z).toBe(-3 / 7)
  expect(baseInstance.props.children.length).toBe(2)
  expect(baseInstance.props.children[0].props.width).toBe(Math.ceil(52 / 7) / 7)
})

test('Can get the label text', () => {
  const fakeData = new Array(52).fill(2)
  const component = shallow(
    <TrophyModel entity='Broha22' year='2018' data={fakeData} />).instance()

  expect(component.getLabelText()).toBe('Broha22 / 2018')
})

test('Can get the label', () => {
  const fakeData = new Array(52)
  for (let index in fakeData) {
    fakeData[index] = { count: 2, level: 0 }
  }
  const component = shallow(
    <TrophyModel entity='Broha22' year='2018' data={fakeData} />).instance()
  const label = component.getLabel()
  expect(label.props.position.x).toBe(0)
  expect(label.props.position.y).toBe(-0.125)
  expect(label.props.position.z).toBe(0)
  expect(label.props.children.length).toBe(2)
  expect(label.props.children[0].props.text).toBe('Broha22 / 2018')
})

test('Can get the bars', () => {
  const fakeData = new Array(52).fill({ count: 2, level: 0 })

  const component = shallow(
    <TrophyModel entity='Broha22' year='2018' data={fakeData} />).instance()
  const bars = component.getBars()
  expect(bars.length).toBe(52)
  expect(bars[1].key).toBe('1')
})
