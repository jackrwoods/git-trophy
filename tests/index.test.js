import axios from 'axios'
import React from 'react'
import App from '../src/components/App'
import ReactDOM from 'react-dom'
jest.mock('react-ga')
jest.mock('react-dom')
require('../src/index')


test('renders without crashing', () => {

  //testing that ReacDOM.render is rendering normally in index.js
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

})
