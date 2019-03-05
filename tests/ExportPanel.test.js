/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-05T11:11:39-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-05T11:27:47-08:00
 */

import React from 'react' // Import react
// eslint-disable-next-line
import { shallow, mount, render, configure } from 'enzyme'// need to import the renderer
import Adapter from 'enzyme-adapter-react-15'
configure({ adapter: new Adapter() })
// quit copying here

// eslint-disable-next-line
import ExportPanel from '../src/components/ExportPanel.js' // import the componenet to be tested

test('Can render the panel', () => {
  const component = shallow(
    <ExportPanel entity='Broha22' onDownloadClick={() => {}} onExportClick={() => {}} year='2019' />).instance()
  expect(component.props.entity).toBe('Broha22')
})

test('Can get the URL', () => {
  const component = shallow(
    <ExportPanel entity='Broha22' onDownloadClick={() => {}} onExportClick={() => {}} year='2019' />).instance()
  expect(component.getURL()).toBe('http://gittrophy.com?entity=Broha22&year=2019')
})

test('Can get the button group', () => {
  const component = shallow(
    <ExportPanel entity='Broha22' onDownloadClick={() => {}} onExportClick={() => {}} year='2019' />).instance()
  expect(component.getButtonGroup('20').props.size).toBe('20')
})
