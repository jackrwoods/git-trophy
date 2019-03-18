/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-17T18:33:27-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-17T19:25:36-07:00
 */

import React from 'react'
import PropTypes from 'prop-types'
import { CirclePicker } from 'react-color'
import { Segment, Form, Dropdown, Header } from 'semantic-ui-react'

export default class RepoSelector extends React.Component {
  static propTypes = {
    entity: PropTypes.string.isRequired,
    erroredEntity: PropTypes.bool,
    loadingYears: PropTypes.bool,
    updateSelectedEntity: PropTypes.func.isRequired,
    updateSelectedYear: PropTypes.func.isRequired,
    year: PropTypes.string.isRequired,
    yearOptions: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
    updateColor: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleDropdownChange = this.handleDropdownChange.bind(this)
    this.handleEntityChange = this.handleEntityChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)

    this.state = {
      githubEntity: 'DEFAULT_GITHUB_ENTITY',
      selectedYear: this.props.yearOptions ? this.props.yearOptions[0] : null
    }
  }

  handleDropdownChange (e, data) {
    this.props.updateSelectedYear(data.value)
  }

  handleEntityChange (e, data) {
    this.props.updateSelectedEntity(data.value)
  }

  handleColorChange (color, event) {
    let r, g, b
    let t = []
    for (let i = 0; i < 5; i++) {
      r = Math.round((238 - color.rgb.r) * (4 - i) / 4 + color.rgb.r).toString(16)
      g = Math.round((238 - color.rgb.g) * (4 - i) / 4 + color.rgb.g).toString(16)
      b = Math.round((238 - color.rgb.b) * (4 - i) / 4 + color.rgb.b).toString(16)
      t.push('#' + r + g + b)
    }
    this.props.updateColor(color.hex, t)
  }

  render () {
    return (
      <Segment attached='top'>
        <Header
          size='large'
          content='Generate a Git Trophy' />
        <Form size='large'>
          <Form.Field>
            <Form.Input
              onChange={this.handleEntityChange}
              value={this.props.entity}
              label='Github Username or Repo'
              placeholder='User / Repo Name'
              error={this.props.erroredEntity} />
          </Form.Field>
          <Form.Field>
            <label>Year</label>
            <Dropdown
              onChange={this.handleDropdownChange}
              fluid
              selection
              options={this.props.yearOptions}
              disabled={!this.props.yearOptions || !this.props.yearOptions.length}
              loading={this.props.loadingYears}
              value={this.props.year} />
          </Form.Field>
          <Form.Field>
            <label>Color</label>
            <CirclePicker colors={['#195127', '#e96740']} color={this.props.color} onChangeComplete={this.handleColorChange} />
          </Form.Field>
        </Form>
      </Segment>
    )
  }
}
