import React from 'react';
import {Modal,Button ,Row, Col} from 'react-bootstrap';

const RenderDeleteCategoryModal=(props)=>{
 const { show,deleteCategoryCloseHandler,expendedArray, checkedArray} =props;
    return (
        <Modal show={show} onHide={deleteCategoryCloseHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Expended Categories</h5>
          {expendedArray.length > 0 &&
            expendedArray.map((item, index) => (
              <Row key={item.value}>
                <Col>{item.name}</Col>
              </Row>
            ))}
          <h5>Checked Categories</h5>
          {checkedArray.length > 0 &&
            checkedArray.map((item, index) => (
              <Row key={item.value}>
                <Col>{item.name}</Col>
              </Row>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteCategoryCloseHandler}>
            Save changing
          </Button>
        </Modal.Footer>
      </Modal>
     
      );
}

export default RenderDeleteCategoryModal;