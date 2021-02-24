import React from 'react';
import {Modal,Button ,Row, Col} from 'react-bootstrap';
import Input from '../../../component/UI/Input';
const RenderUpdateCategoryModal=(props)=>{
  const {editCategoryShow,handleEditCategoryClose,checkedArray,expendedArray,handleCategoryInput,createCategoryList}=props;
  console.log({checkedArray});
return ( <Modal show={editCategoryShow} onHide={handleEditCategoryClose} size="lg">
<Modal.Header closeButton>
  <Modal.Title>Update Categories</Modal.Title>
</Modal.Header>

<Modal.Body>
  <Row>
    <Col>Checked Array</Col>
  </Row>
  {checkedArray.length > 0 &&
    checkedArray.map((item, index) => (
      <Row key={item.value}>
        <Col>
          <Input
            value={item.name}
            placeholder={"Category Name"}
            onChange={(e) =>
              handleCategoryInput(
                "name",
                e.target.value,
                index,
                "checked"
              )
            }
          />
        </Col>
        <Col>
          <select
            className="form-control"
            value={item.parentId}
            onChange={(e) =>
              handleCategoryInput(
                "parentId",
                e.target.value,
                index,
                "checked"
              )
            }
          >
           <option value={""}>Select Option</option>
            {createCategoryList.map((option) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
        <Col>
          <select
            className="form-control"
            onChange={(e) =>
              handleCategoryInput(
                "type",
                e.target.value,
                index,
                "checked"
              )
            }
            value={item.type}
            
          >
            <option value={""}>Select Option</option>
            <option value="store">Store</option>
            <option value="product">Product</option>
            <option value="page">page</option>
          </select>
        </Col>
      </Row>
    ))}
  <Row>
    <Col>Expended Array</Col>
  </Row>
  {expendedArray.length > 0 &&
    expendedArray.map((item, index) => (
      <Row key={item.value}>
        <Col>
          <Input
            value={item.name}
            placeholder={"Category Name"}
            onChange={(e) =>
              handleCategoryInput(
                "name",
                e.target.value,
                index,
                "expended"
              )
            }
          />
        </Col>
        <Col>
          <select
            className="form-control"
            value={item.parentId}
            onChange={(e) =>
              handleCategoryInput(
                "parentId",
                e.target.value,
                index,
                "expended"
              )
            }
            
          >
            <option value={null}>Select Option</option>
            {createCategoryList.map((option) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
        <Col>
          <select
            className="form-control"
            onChange={(e) =>
              handleCategoryInput(
                "type",
                e.target.value,
                index,
                "expended"
              )
            }
            value={item.type}
          >
           <option value={""}>Select Option</option>
            <option value="store">Store</option>
            <option value="product">Product</option>
            <option value="page">page</option>
          </select>
        </Col>
      </Row>
    ))}
</Modal.Body>
<Modal.Footer>
  <Button variant="primary" onClick={handleEditCategoryClose}>
    Save Changes
  </Button>
</Modal.Footer>
</Modal>
     
      );
}

export default RenderUpdateCategoryModal;