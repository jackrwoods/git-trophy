/**
 * @Author: Rachel Sousa <Rachel>
 * @Date:   2019-02-28
 * @Email:  sousar@oregonstate.edu
 * @Last modified by:   Rachel
 * @Last modified time: 2019-02-28
 */

import React from 'react' // Import react
// eslint-disable-next-line
import { shallow, mount, render, configure } from 'enzyme'// need to import the renderer
import Adapter from 'enzyme-adapter-react-15'
configure({ adapter: new Adapter() })

import types from '../src/types.js'

// Describe the test you are about to do
test('const Check', () => {
  expect(RECEIVED_CONTRIBUTION_DATA).toBe('received_contribution_data')
  expect(RECEIVED_YEAR_OPTIONS).toBe('received_year_options')

  expect(START_AUTHENTICATION).toBe('start_authentication')
  expect(START_CONTRIBUTION_UPDATE).toBe('start_contribution_update')
  expect(START_DOWNLOAD_LOAD).toBe('start_download_load')
  expect(START_EXPORT_LOAD).toBe('start_export_load')
  expect(START_MODEL_LOADING).toBe('start_model_loading')
  expect(START_YEARS_UPDATE).toBe('start_years_update')

  expect(FINISHED_DOWNLOAD_LOAD).toBe('finished_download_load')
  expect(FINISHED_EXPORT_LOAD).toBe('finished_export_load')

  expect(ERRORED_CONTRIBUTIONS_FETCH).toBe('errored_contributions_fetch')
  expect(ERRORED_YEAR_FETCH).toBe('errored_year_fetch')

  expect(UPDATE_SCENE_CONTAINER).toBe('update_scene_container')
  expect(UPDATE_SELECTED_ENTITY).toBe('update_selected_entity')
  expect(UPDATE_SELECTED_YEAR).toBe('update_selected_year')
})
