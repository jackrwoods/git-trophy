/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-05T13:29:49-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-05T19:51:21-08:00
 */

import React from 'react' // Import react
// eslint-disable-next-line
import { shallow, mount, render, configure } from 'enzyme'// need to import the renderer
import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })
// eslint-disable-next-line
import PreviewContainer from '../src/containers/PreviewContainer.js' // import the componenet to be tested

test('Can render PreviewContainer', () => {
  const fakeData = new Array(52).fill({ count: 2, level: 0 })
  const component = shallow(
    <PreviewContainer data={fakeData} entity='Broha22' year='2019' setSceneContainer={() => {}} />).instance()
  expect(component).anything()
})
test('Will reset state when calling will recieve props', () => {
  const fakeData = new Array(52).fill({ count: 2, level: 0 })
  const component = shallow(
    <PreviewContainer data={fakeData} entity='Broha22' year='2019' setSceneContainer={() => {}} />).instance()
  component.setState({ stillLoading: true })
  expect(component.state.stillLoading).toBe(true)
  component.componentWillReceiveProps({ hello: 0 })
  expect(component.state.stillLoading).toBe(false)
})
test('Sets scene on mount', () => {
  const fakeData = new Array(52).fill({ count: 2, level: 0 })
  let testVar = 0
  shallow(
    <PreviewContainer data={fakeData} entity='Broha22' year='2019' setSceneContainer={() => { testVar = 1 }} />)
  expect(testVar).toBe(1)
})
test('Updates scene on component update', () => {
  const fakeData = new Array(52).fill({ count: 2, level: 0 })
  let testVar = 0
  const component = shallow(
    <PreviewContainer data={fakeData} entity='Broha22' year='2019' setSceneContainer={() => { testVar++ }} />)
  component.componentDidUpdate()
  expect(testVar).toBe(2)
})
