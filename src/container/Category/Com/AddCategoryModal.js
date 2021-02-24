import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import Input from '../../../component/UI/Input';
const AddCategoryModal=(props)=>{
  const {show,
  handleClose,
  categoryName,
  createList,
  categoryparentId,
  handleImageUpload,
  setCategoryName,
  setCategoryparentId}=props;
    return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              value={categoryName}
              placeholder={"Category Name"}
              onChange={(e) => setCategoryName(e.target.value)}
            />
  
            <select
              className="form-control"
              value={categoryparentId}
              onChange={(e) => setCategoryparentId(e.target.value)}
            >
              <option>select categories</option>
              {createList.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              name="categoryImage"
              onChange={handleImageUpload}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      );
}

export default AddCategoryModal;