/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-17T18:25:27-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-17T19:50:59-07:00
 */

import React from 'react'
import PropTypes from 'prop-types'
import React3 from 'react-three-renderer'
import TrophyModel from './TrophyModel'
import * as THREE from 'three'

const OrbitControls = require('three-orbit-controls')(require('three'))

export default class Preview extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    entity: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    style: PropTypes.object,
    width: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
    colors: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props)

    const { width } = this.props
    let position
    if (width > 500) {
      position = new THREE.Vector3(1, 2, 5)
    } else {
      position = new THREE.Vector3(1, 3, 8)
    }
    this.state = {
      cameraPosition: position
    }
  }

  componentDidMount () {
    const controls = new OrbitControls(this.refs.camera, this.refs.container)
    controls.minDistance = 4
    controls.maxDistance = 25
    controls.enablePan = false
    this.controls = controls

    // Lock light position to camera position
    this.refs.light.position.copy(this.refs.camera.position)
    this.controls.addEventListener('change', () => {
      this.refs.light.position.copy(this.refs.camera.position)
    })
  }

  componentWillUnmount () {
    this.controls.dispose()
    delete this.controls
  }

  render () {
    const { width, height } = this.props
    const aspectratio = width / height

    var cameraprops = {
      fov: 75,
      aspect: aspectratio,
      near: 0.001,
      far: 1000,
      position: this.state.cameraPosition,
      lookAt: new THREE.Vector3(0, 0, 0)
    }

    const data = []
    for (var i = 0; i < 368; i++) {
      data.push({count: Math.random(), level: Math.floor(Math.random() * 5)})
    }

    const style = this.props.style || {}
    style.cursor = 'move'
    const iconStyle = this.props.style || {}
    const bgStyle = this.props.style || {}
    if (this.props.error) {
      iconStyle.fontSize = '50px'
      iconStyle.textAlign = 'center'
      iconStyle.width = '100%'
      iconStyle.color = 'white'
      iconStyle.paddingTop = '200px'
      bgStyle.backgroundColor = 'red'
      bgStyle.zPosition = 200
      bgStyle.display = 'block'
      bgStyle.textAlign = 'center'
      bgStyle.width = '100%'
      bgStyle.color = 'white'
      bgStyle.height = '450px'
      style.display = 'none'
    } else {
      bgStyle.display = 'none'
    }
    return (
      <div>
      <div style={bgStyle}>
        <i className='fas fa-exclamation-triangle' style={iconStyle} />
        <br />Invalid Entity Name
      </div>
      <div style={style} ref='container'>
        <React3 onAnimate={this.onAnimate} antialias mainCamera='maincamera' width={width} height={height} clearColor={0xffffff}>
          <scene ref='scene'>

            <perspectiveCamera ref='camera' name='maincamera' {...cameraprops} />

            <directionalLight
              color={0xffffff}
              intensity={0.7}
              castShadow
              ref='light' />

            <ambientLight color={0xffffff} intensity={0.7} />

            <TrophyModel
              data={this.props.data}
              entity={this.props.entity}
              year={this.props.year}
              colors={this.props.colors} />
          </scene>
        </React3>
      </div>
      </div>
    )
  }
}
