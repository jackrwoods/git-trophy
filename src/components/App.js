import React from 'react'
import Navbar from './Navbar'
import PreviewContainer from './PreviewContainer'
import RepoSelector from './RepoSelector'
import { Grid } from 'semantic-ui-react'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Navbar />
        <Grid style={{maxWidth: 1200, margin: '0 auto'}}>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <RepoSelector />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={11}>
            <PreviewContainer />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
