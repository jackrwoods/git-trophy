/**
 * @Author: Rachel Sousa <Rachel>
 * @Date:   2019-02-28
 * @Email:  sousar@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-05T10:05:12-08:00
 */

import React from 'react' // Import react
// eslint-disable-next-line
import { shallow, mount, render, configure } from 'enzyme'// need to import the renderer
import Adapter from 'enzyme-adapter-react-15'
import Portal from 'semantic-ui-react/dist/commonjs/addons/Portal/Portal'
configure({ adapter: new Adapter() })

jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({children}) => children)

import RepoSelector from '../src/components/RepoSelector.js'

// Describe the test you are about to do
test('Component State Test', () => {
  // Ignore the next line its to hush the linting error, as true always = true
  // eslint-disable-next-line
  const fakeData = new Array(3).fill('2018')
  const component = shallow(
    <RepoSelector entity='rachel-sousa' updateSelectedEntity={()=>{}} updateSelectedYear={()=>{}} year='2018' yearOptions={fakeData} />
  ).instance()
  expect(component.state.githubEntity === 'DEFAULT_GITHUB_ENTITY') // Assertion Statement
  expect(component.state.selectedYear === 2018)
})

test('handleDropdownChange Test', () => {
  // Ignore the next line its to hush the linting error, as true always = true
  // eslint-disable-next-line
  const fakeData = new Array(3)
  for (let index in fakeData) {
    fakeData[index] = index.toString()
  }
  let num = 0
  const component = shallow(
    <RepoSelector entity='rachel-sousa' updateSelectedEntity={() => {}} updateSelectedYear={v => { component.props.year = component.props.yearOptions[v] }} year='2018' yearOptions={fakeData} />
  ).instance()
  component.handleDropdownChange({}, { value: 0 })
  expect(component.props.year[0] === 0)
  // expect(handleEntityChange())
})
