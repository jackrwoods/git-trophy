/**
 * @Author: Jack Woods
 * @Date:   2019-03-04T19:31:49-08:00
 * @Email:  jackrwoods@gmail.com
 * @Filename: actions.test.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-03-04T21:54:39-08:00
 */

import axios from 'axios'
import localStorage from 'localStorage'
jest.mock('react-ga')

import { loadContributions, ERRORED_CONTRIBUTIONS_FETCH } from '../src/actions.js'

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

// Redux store mock
const dispatch = jest.fn()

// Tests
describe('Contributions', () => {
  test('don\'t error erroneously', () => {
    expect(loadContributions('woodjack', 2018)).not.toThrow()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).not.toHaveBeenCalledWith({type: ERRORED_CONTRIBUTIONS_FETCH})
  })
})
