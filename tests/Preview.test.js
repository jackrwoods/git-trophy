/**
 * @Author: Rachel Sousa <Rachel>
 * @Date:   2019-02-28
 * @Email:  sousar@oregonstate.edu
 * @Last modified by:   Rachel
 * @Last modified time: 2019-03-05T10:05:12-08:00
 */

import React from 'react' // Import react
// eslint-disable-next-line
import { shallow, mount, render, configure } from 'enzyme'// need to import the renderer
import Adapter from 'enzyme-adapter-react-15'
import Portal from 'semantic-ui-react/dist/commonjs/addons/Portal/Portal'
configure({ adapter: new Adapter() })

jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({children}) => children)

import Preview from '../src/components/Preview.js'

// Describe the test you are about to do
test('Component State Test', () => {
  const fakeData = new Array(3)
  for (let index in fakeData) {
    fakeData[index] = index.toString()
  }
  let num = 0
  const component = shallow(
    <Preview data={fakeData} entity='rachel-sousa' height={5} width={10} year='2018' />
  ).instance()
  component.setState({position : THREE.Vector3(1, 3, 8)})
  component.componentDidMount()
  expect(component.controls.minDistance).toBe(4)
})
