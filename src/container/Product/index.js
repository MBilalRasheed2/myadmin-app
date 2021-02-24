import { useState } from "react";
import Layout from "../../component/Layout";
import { Modal, Button, Row, Col, Table } from "react-bootstrap";
import Input from "../../component/UI/Input";
import {generatePublicUrl} from '../../urlConfig';
import { addProduct } from "../../actions/productAction";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
const Product = (props) => {
  const [show, setShow] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [nameProduct, setNameProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [quantityProduct, setQuantityProduct] = useState("");
  const [productPicture, setProductPictures] = useState([]);
  const [categoryparentId, setCategoryparentId] = useState("");
  const [productDetails, setProductDetails] = useState(null);
  const categories = useSelector((state) => state.category.categories);

  const productData = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  const createCategoryList = (categories, options = []) => {
    for (let cat of categories) {
      options.push({ value: cat._id, name: cat.name });
      if (cat.children.length > 0) {
        createCategoryList(cat.children, options);
      }
    }
    return options;
  };

  const handleClose = () => {
    const form = new FormData();
    form.append("name", nameProduct);
    form.append("description", descriptionProduct);
    form.append("price", priceProduct);
    form.append("quantity", quantityProduct);
    form.append("category", categoryparentId);
    for (let pic of productPicture) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  };

  const handleUploadPictures = (e) => {
    setProductPictures([...productPicture, e.target.files[0]]);
  };
  const handleProductDetailsClose = () => {
    setShowProductDetails(false);
  };
  const handleProductDetailsShow = (product) => {
    setProductDetails(product);
    setShowProductDetails(true);
  };
  const ProductDetailsModal = () => {
    if (!productDetails) {
      return;
    }
    return (
      <Modal key={productDetails._id}
        show={showProductDetails}
        onHide={handleProductDetailsClose}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <label>name</label>
              <p>{productDetails.name}</p>
            </Col>
            <Col md={6}>
              <label>price</label>
              <p>{productDetails.price}</p>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label>quantity</label>
              <p>{productDetails.quantity}</p>
            </Col>
            <Col md={6}>
              <label>category</label>
              <p>{productDetails.category.name}</p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <label>Decription</label>
              <p>{productDetails.description}</p>
            </Col>
          </Row>
          <Row>
          
            <Col>
             <div style={{ display: "flex" }} >
             {productDetails.productPictures.map((pic) => (
                <div className="productImgContainer" key={pic._id} >
                  <img
                    alt={productDetails.name}
                    src={generatePublicUrl(pic.img)}
                  />
                </div>
              ))}
             </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleProductDetailsClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleProductDetailsClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const handleShow = () => setShow(true);
  return (
    <div>
      <Layout sidebar>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Product</h1>
              <Button onClick={handleShow}>Add Product</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table responsive="md">
              <thead>
                <tr>
                  <th>#</th>
                  <th>name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>category</th>
                 
                </tr>
              </thead>
              <tbody>
                {productData.length > 0
                  ? productData.map((pro) => (
                      <tr
                        key={pro._id}
                        onClick={handleProductDetailsShow.bind(this, pro)}
                      >
                        <td>1</td>
                        <td>{pro.name}</td>
                        <td>{pro.price}</td>
                        <td>{pro.quantity}</td>
                        <td>{pro.category.name}</td>
                       
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              Label="Name"
              value={nameProduct}
              placeholder={"Enter Name"}
              onChange={(e) => setNameProduct(e.target.value)}
            />
            <Input
              Label="Description"
              value={descriptionProduct}
              placeholder={"Enter description"}
              onChange={(e) => setDescriptionProduct(e.target.value)}
            />
            <Input
              Label="Price"
              value={priceProduct}
              placeholder={"Enter Price"}
              onChange={(e) => setPriceProduct(e.target.value)}
            />
            <Input
              Label="Quantity"
              value={quantityProduct}
              placeholder={"Enter Quantity"}
              onChange={(e) => setQuantityProduct(e.target.value)}
            />
            <select
              className="form-control"
              value={categoryparentId}
              onChange={(e) => setCategoryparentId(e.target.value)}
            >
              <option>select categories</option>
              {createCategoryList(categories).map((option) => (
                <option value={option.value} key={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            {productPicture.length > 0
              ? productPicture.map((pic, index) => (
                  <div key={index}>{pic.name}</div>
                ))
              : null}
            <input
              type="file"
              name="productPicture"
              onChange={handleUploadPictures}
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
        {ProductDetailsModal()}
      </Layout>
    </div>
  );
};

export default Product;
