/**
 * @Author: Jack Woods
 * @Date:   2019-03-04T19:31:49-08:00
 * @Email:  jackrwoods@gmail.com
 * @Filename: actions.test.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-03-05T11:57:31-08:00
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
import { loadContributions, updateSelectedEntity } from '../src/actions.js'

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

const yearsData = {
  'entity': 'jackrwoods',
  'years': [
    '2019',
    '2018',
    '2017',
    '2016'
  ]
}

// Tests
describe('loadContributions', () => {
  // Mock API data
  axios.get.mockImplementation(() => Promise.resolve({
    data: contributionData
  }))

  test('doesn\'t error erroneously', (done) => {
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

  test('dispatches the correct data', (done) => {
    // Initialize mockstore with empty state
    const initialState = {
      app: {
        entity: 'woodjack'
      }
    }
    const store = mockStore(initialState)

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

  test('doesn\'t dispatch when entities don\'t match', (done) => {
    // Initialize mockstore with empty state
    const initialState = {
      app: {
        entity: 'woodjack'
      }
    }
    const store = mockStore(initialState)

    // Call the function to register actions
    loadContributions('brohaSucks', 2018)(store.dispatch, store.getState).then(res => {
      // Test if your store dispatched the expected actions
      const actions = store.getActions()
      expect(actions).toEqual([{type: START_CONTRIBUTION_UPDATE}])
      expect(actions.length).toBe(1)
      done()
    })
  })
})

describe('updateSelectedEntity', () => {
  test('can change to the same entity', (done) => {
    // Mock API data
    axios.get.mockImplementationOnce(() => Promise.resolve({
      data: yearsData
    }))

    // Initialize mockstore with empty state
    const initialState = {
      app: {
        entity: 'woodjack'
      }
    }
    const store = mockStore(initialState)
    const preStore = store.getState()
    updateSelectedEntity('woodjack', 2018)(store.dispatch, store.getState)
    setTimeout(() => {
      expect(store.getActions()[0]).toEqual({ type: UPDATE_SELECTED_ENTITY, entity: 'woodjack' })
      done()
    }, 350)
  })
  test('can change to a different entity', (done) => {
    // Mock API data
    axios.get.mockImplementationOnce(() => Promise.resolve({
      data: yearsData
    }))

    // Initialize mockstore with empty state
    const initialState = {
      app: {
        entity: 'woodjack'
      }
    }
    const store = mockStore(initialState)
    updateSelectedEntity('brohaSucks', 2018)(store.dispatch, store.getState)
    setTimeout(() => {
      expect(store.getActions()[0]).toEqual({ type: UPDATE_SELECTED_ENTITY, entity: 'brohasucks' })
      done()
    }, 350)
  })
  test('can change to a blank entity', (done) => {
    // Mock API data
    axios.get.mockImplementationOnce(() => Promise.resolve({
      data: yearsData
    }))

    // Initialize mockstore with empty state
    const initialState = {
      app: {
        entity: 'woodjack'
      }
    }
    const store = mockStore(initialState)
    updateSelectedEntity('', 2018)(store.dispatch, store.getState)
    setTimeout(() => {
      expect(store.getActions()[0]).toEqual({ type: UPDATE_SELECTED_ENTITY, entity: '' })
      done()
    }, 350)
  })
})
