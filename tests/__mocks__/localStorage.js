/**
 * @Author: Jack Woods
 * @Date:   2019-03-04T21:39:11-08:00
 * @Email:  jackrwoods@gmail.com
 * @Filename: localStorage.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-03-04T21:39:41-08:00
 */
export const localStorageMock = {
  getItem: jest.fn().mockImplementation(key => localStorageItems[key]),
  setItem: jest.fn().mockImplementation((key, value) => {
    localStorageItems[key] = value
  }),
  clear: jest.fn().mockImplementation(() => {
    localStorageItems = {}
  }),
  removeItem: jest.fn().mockImplementation((key) => {
    localStorageItems[key] = undefined
  })
}

export let localStorageItems = {}
