import React from 'react';
import {
  Col,
  Tab,
  Tabs,
  Table
} from 'react-bootstrap'

function getPercentage (localFreq, freq) {
  return `${Math.round(localFreq * 100 / freq)}%`
}

class Reviews extends React.Component {
  render () {
    const { data } = this.props
    const reviews = data.map((review) => {
      return <tr key={review.id}>
        <td>{review.title}</td>
        <td>{review.content}</td>
        <td>{review.rating}</td>
      </tr>
    })
    return <Table bordered condensed>
      <thead>
        <tr>
          <th>title</th>
          <th>content</th>
          <th>rating</th>
        </tr>
      </thead>
      <tbody>
        {reviews}
      </tbody>
    </Table>
  }
}

class TokenAnalysis extends React.Component {
  render () {
    const { data } = this.props
    const tokens = data.map((token) => {
      const { freq } = token
      return <tr key={token.term}>
        <td>{token.term}</td>
        <td>{getPercentage(token.ratings['1'], freq)}</td>
        <td>{getPercentage(token.ratings['2'], freq)}</td>
        <td>{getPercentage(token.ratings['3'], freq)}</td>
        <td>{getPercentage(token.ratings['4'], freq)}</td>
        <td>{getPercentage(token.ratings['5'], freq)}</td>
        <td>{freq}</td>
      </tr>
    })
    return <Table bordered condensed>
      <thead>
        <tr>
          <th>Term</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>Term Freq</th>
        </tr>
      </thead>
      <tbody>
        {tokens}
      </tbody>
    </Table>
  }
}

export default class Data extends React.Component {
  render () {
    const { data } = this.props
    if (!data) {
      return null
    }

    console.log(data)

    return <Col lg={10}>
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Reviews">
          <Reviews data={data.reviews} />
        </Tab>
        <Tab eventKey={2} title="Token Analysis">
          <TokenAnalysis data={data.tokenAnalysis} />
        </Tab>
      </Tabs>
    </Col>
  }
}

