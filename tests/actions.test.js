/**
 * @Author: Jack Woods
 * @Date:   2019-03-04T19:31:49-08:00
 * @Email:  jackrwoods@gmail.com
 * @Filename: actions.test.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-03-05T09:49:43-08:00
 */

import axios from 'axios'

import localStorage from 'localStorage'
jest.mock('react-ga')

import configureStore from 'redux-mock-store'
const middlewares = []
const mockStore = configureStore(middlewares)

import {
  ERRORED_CONTRIBUTIONS_FETCH,
  ERRORED_YEAR_FETCH,
  FINISHED_DOWNLOAD_LOAD,
  FINISHED_EXPORT_LOAD,
  RECEIVED_CONTRIBUTION_DATA,
  RECEIVED_YEAR_OPTIONS,
  START_CONTRIBUTION_UPDATE,
  START_DOWNLOAD_LOAD,
  START_EXPORT_LOAD,
  START_YEARS_UPDATE,
  UPDATE_SCENE_CONTAINER,
  UPDATE_SELECTED_ENTITY,
  UPDATE_SELECTED_YEAR } from '../src/types'
import{ loadContributions } from '../src/actions.js'

const contributionData = {
  'contributions': [
    {
      'count': 0,
      'day': '2018-01-01',
      'level': 0
    },
    {
      'count': 0,
      'day': '2018-01-02',
      'level': 0
    },
    {
      'count': 0,
      'day': '2018-01-03',
      'level': 0
    },
    {
      'count': 0,
      'day': '2018-01-04',
      'level': 0
    },
    {
      'count': 0,
      'day': '2018-01-05',
      'level': 0
    },
    {
      'count': 0,
      'day': '2018-01-06',
      'level': 0
    },
    {
      'count': 0,
      'day': '2018-01-07',
      'level': 0
    },
    {
      'count': 3,
      'day': '2018-01-08',
      'level': 1
    }
  ]
}

// Tests
describe('Contributions', () => {
  // Mock API data
  axios.get.mockImplementation(() => Promise.resolve({
    data: contributionData
  }))

  const registerChartDownload = jest.fn()

  test('don\'t error erroneously', (done) => {
    // Initialize mockstore with empty state
    const initialState = {
      app: {
        entity: 'woodjack'
      }
    }
    const store = mockStore(initialState)

    // loadContributions returns a function that modifies the redux store. Yuck.
    expect(loadContributions(store.getState().app.entity, 2018)).not.toThrow(store.dispatch, store.getState)

    // Call the function to register actions
    loadContributions(store.getState().app.entity, 2018)(store.dispatch, store.getState).then(res => {
      // Test if your store dispatched the expected actions
      const actions = store.getActions()
      expect(actions).not.toEqual([{type: START_CONTRIBUTION_UPDATE}, {type: ERRORED_CONTRIBUTIONS_FETCH}])
      expect(actions.length).toBe(2)
      done()
    })
  })

  test('dispatch the correct data', (done) => {
    // Initialize mockstore with empty state
    const initialState = {
      app: {
        entity: 'woodjack'
      }
    }
    const store = mockStore(initialState)

    // loadContributions returns a function that modifies the redux store. Yuck.
    expect(loadContributions(store.getState().app.entity, 2018)).not.toThrow(store.dispatch, store.getState)

    // Call the function to register actions
    loadContributions(store.getState().app.entity, 2018)(store.dispatch, store.getState).then(res => {
      // Test if your store dispatched the expected actions
      const actions = store.getActions()
      const expectedPayload = {
        type: RECEIVED_CONTRIBUTION_DATA,
        data: contributionData.contributions,
        entity: store.getState().app.entity,
        year: 2018
      }
      expect(actions).toEqual([{type: START_CONTRIBUTION_UPDATE}, expectedPayload])
      expect(actions.length).toBe(2)
      done()
    })
  })
})
