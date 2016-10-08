import React from 'react';
import ReactDOM from 'react-dom';

import AppForm from './form.jsx'
import AppData from './data.jsx'
import analyzeApp from './lib/appnalytic'
import {
  Grid,
  Row
} from 'react-bootstrap'

class App extends React.Component {
  state = {}

  render () {
    const { appData } = this.state
    return <Grid>
      <Row>
        <AppForm onChange={this.onChange} onSubmit={this.onSubmit} />
        <AppData data={appData} />
      </Row>
    </Grid>
  }

  onChange = (e) => {
    console.log(e.target.value)
    this.setState({
      appId: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { appId } = this.state
    const setState = this.setState
    analyzeApp(appId)
      .then((json) => {
        this.setState({appData: json})
      })
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
