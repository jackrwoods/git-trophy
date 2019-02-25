/**
 * @Author: Jack Woods
 * @Date:   2019-01-15T09:01:50-08:00
 * @Email:  jackrwoods@gmail.com
 * @Filename: actions.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-02-21T09:19:23-08:00
 */

import axios from 'axios' // Library for making API requests
import debounce from 'debounce' // Library that claims "Useful for implementing behavior that should only happen after a repeated action has completed." -> https://www.npmjs.com/package/debounce
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
  UPDATE_SELECTED_YEAR } from './types'
import exportSceneX3D from './x3d-exporter'
import download from 'downloadjs'
import authConfig from './oauth'
import { login } from 'redux-implicit-oauth2'
import {
  registerDownload,
  registerShapewaysExport,
  registerChartDownload } from './analytics'

// Amazon API Gateway url -> https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-deploy-api.html
const BASE_URL = 'https://xfrua0iqkc.execute-api.us-east-1.amazonaws.com/dev'

// Don't know what this does yet
// Props: entity
//        year
export const loadContributions = (entity, year) => (dispatch, getState) => {
  // Use of dispatch(), getState(), etc point to redux as central data store
  dispatch({ type: START_CONTRIBUTION_UPDATE }) // Triggers a state change
  registerChartDownload(entity, year)
  return axios.get(`${BASE_URL}/v1/contributions`, { params: {entity, year} }) // Execute API request
    .then((response) => {
      if (entity !== getState().app.entity) { // If the entity is not equal to the current state's entity, do nothing?
        return
      }

      updateQueryString(entity, year) // Updates the state's request url with a new entity and year
      dispatch({ // Dispatch a state change
        type: RECEIVED_CONTRIBUTION_DATA,
        data: response.data.contributions,
        entity: entity,
        year: year
      })
    })
    .catch(() => { // If an error occurs
      if (entity !== getState().app.entity) {
        return
      }

      dispatch({type: ERRORED_CONTRIBUTIONS_FETCH}) // Dispatch a state change
    })
}

// Debouncing eliminates redundant input
// Why are we debouncing functions?
const debouncedYearOptionsFetch = debounce((dispatch, getState, entity, year) => {
  if (!entity) {
    return
  }

  dispatch({type: START_YEARS_UPDATE}) // State change

  // Make API call
  return axios.get(`${BASE_URL}/v1/years`, { params: {entity} })
    // The following three lines are repeated a lot. Perhaps API calls should be wrapped in a function?
    .then((response) => {
      if (entity !== getState().app.entity) {
        return
      }

      const years = response.data.years
      dispatch({ type: RECEIVED_YEAR_OPTIONS, years: years }) // State change

      if (!years) {
        dispatch({type: ERRORED_YEAR_FETCH}) // State change
      }

      const previousYear = (new Date().getFullYear() - 1).toString()
      let defaultYear
      // Why test for the existance of year? It's defined as a constant, and its existance is guaranteed by axios...
      if (year && years.includes(year)) {
        defaultYear = year
      } else if (years.includes(previousYear)) {
        defaultYear = previousYear
      } else {
        defaultYear = years[0]
      }
      dispatch({ type: UPDATE_SELECTED_YEAR, year: defaultYear }) // State change
      loadContributions(entity, defaultYear)(dispatch, getState) // Only loads contributions for the specified year
    })
    // This code is also repeated frequently (next 4 lines)
    .catch(() => {
      if (entity !== getState().app.entity) {
        return
      }

      dispatch({type: ERRORED_YEAR_FETCH})
    })
}, 300)

export const updateSelectedEntity = (entity, year) => (dispatch, getState) => {
  entity = entity.toLocaleLowerCase()

  dispatch({ type: UPDATE_SELECTED_ENTITY, entity })
  return debouncedYearOptionsFetch(dispatch, getState, entity, year)
}

// Updates the state's request url with a new entity and year
const updateQueryString = (entity, year) => {
  let newUrl = `?entity=${encodeURIComponent(entity)}`
  newUrl += `&year=${year}`
  history.replaceState('', '', newUrl) // What are the '' for?
}

export const updateSelectedYear = (year) => (dispatch, getState) => {
  if (year === getState().app.year) {
    return
  }
  dispatch({ type: UPDATE_SELECTED_YEAR, year })

  const entity = getState().app.entity
  return loadContributions(entity, year)(dispatch, getState)
}

// Why wrap this object in a function?
export const setSceneContainer = (container) => {
  return {type: UPDATE_SCENE_CONTAINER, container}
}

export const downloadModel = () => (dispatch, getState) => {
  dispatch({type: START_DOWNLOAD_LOAD})
  const { container, entity, year } = getState().app
  registerDownload(entity, year)
  const scene = container.refs.preview.refs.scene
  const fileName = `${entity.replace('/', '-')}-${year}.x3d`

  // Yield control to the renderer
  return setTimeout(() => {
    const x3dData = exportSceneX3D(scene)
    download(x3dData, fileName, 'model/x3d+xml')
    dispatch({type: FINISHED_DOWNLOAD_LOAD})
  }, 5)
}

export const exportModel = () => (dispatch, getState) => {
  if (!getState().auth.isLoggedIn) {
    dispatch(login(authConfig))
    return
  }

  const { container, entity, year } = getState().app
  dispatch({type: START_EXPORT_LOAD})
  registerShapewaysExport(entity, year)

  // Yield control to the renderer
  return new Promise((resolve, reject) => {
    const scene = container.refs.preview.refs.scene
    const x3dData = exportSceneX3D(scene)

    const { token } = getState().auth

    const payload = {
      file: Buffer.from(x3dData).toString('base64'),
      fileName: `${entity.replace('/', '-')}-${year}.x3d`,
      uploadScale: 0.022352, // 88% of 1 inch
      hasRightsToModel: true,
      acceptTermsAndConditions: true,
      title: `Git Trophy - ${entity} (${year})`
    }

    axios.post('https://api.shapeways.com/model/v1', payload,
      {headers: {'Authorization': 'Bearer ' + token}}
    ).then((response) => {
      window.location = response.data.urls.editModelUrl.address
      dispatch({type: FINISHED_EXPORT_LOAD})
      resolve()
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(err)
        console.log(err.response)
      }
      dispatch({type: FINISHED_EXPORT_LOAD})
      reject(err)
    })
  })
}
