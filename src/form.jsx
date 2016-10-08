import React from 'react';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup
} from 'react-bootstrap'

export default class AppForm extends React.Component {
  render () {
    const { onChange, onSubmit } = this.props
    return (
      <Col lg={2}>
        <Form onSubmit={onSubmit}>
          <FormGroup controlId="formInlineName">
            <ControlLabel>AppId</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="Jane Doe" onChange={onChange}/>
          </FormGroup>
          <Button type="submit">
            Analyze
          </Button>
        </Form>
      </Col>
    )
  }
}
