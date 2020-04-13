import React from 'react';
import {Row, Col} from 'antd';
import {Button} from 'react-bootstrap';

const Done = ({setVisibleForgot}) => {
  return (
    <>
      <Row type="flex" justify="center" align="middle" style={{margin: '20px'}}>
        <Col span={8}>
          <img alt="user" src="./verified.png" height="300px" />
        </Col>
        <Col span={8}>
          <h2>Your password has been reset</h2>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Button
          bsPrefix="primary-button"
          type="submit"
          onClick={() => {
            setVisibleForgot(false);
          }}
        >
          Done
        </Button>
      </Row>
    </>
  );
};

export default Done;
