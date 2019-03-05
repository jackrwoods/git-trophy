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

import RepoSelectorContainer from '../src/containers/RepoSelectorContainer.js'

// Describe the test you are about to do
test('Component State Test for container', () => {
  const fakeData = new Array(3)
  for (let index in fakeData) {
    fakeData[index] = index.toString()
  }
  let num = 0
  const component = shallow(
    <RepoSelectorContainer downloadModel={()=>{}} entity='rachel-sousa' exportModel={()=>{}} loadContributions={()=>{}} updateSelectedEntity={v => { component.setState({ entity: v })}} updateSelectedYear={v => { component.props.yearOptions[0] = component.props.yearOptions[v] }} year='2018' yearOptions={fakeData} />
  ).instance()
  expect(component.state.exportAuthInProgress).toBe(false)

})

test('handleExportClick Test', () => {
  const fakeData = new Array(3)
  for (let index in fakeData) {
    fakeData[index] = index.toString()
  }
  let num = 0
  const component = shallow(
    <RepoSelectorContainer downloadModel={()=>{}} entity='rachel-sousa' exportModel={()=>{}} loadContributions={()=>{}} updateSelectedEntity={v => { component.setState({ entity: v })}} updateSelectedYear={v => { component.props.yearOptions[0] = component.props.yearOptions[v] }} year='2018' yearOptions={fakeData} />
  ).instance()
  component.setState({isLoggedIn : true})
  component.handleExportClick()
  expect(component.state.isLoggedIn).toBe(true)

})
