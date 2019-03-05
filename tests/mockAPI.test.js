/**
 * @Author: Jack Woods
 * @Date:   2019-02-28T09:33:46-08:00
 * @Email:  jackrwoods@gmail.com
 * @Filename: mockAPI.test.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-03-04T20:10:13-08:00
 * @Note Thia script just verifies that the API mock works.
 */

import mockAxios from 'axios'

function testMe () {
  return mockAxios.get('lovingmyhomework.com/memes.jpg', {})
    .then((response) => {
      return response.data
    })
}

test('Simulates a get request', done => {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({
    data: {string: 'I love doing homework on the weekends.'}
  }))
  expect(testMe()).resolves.toEqual({string: 'I love doing homework on the weekends.'})
  expect(mockAxios.get).toHaveBeenCalledWith('lovingmyhomework.com/memes.jpg', {})
  expect(mockAxios.get).toHaveBeenCalledTimes(1)
  done()
})
