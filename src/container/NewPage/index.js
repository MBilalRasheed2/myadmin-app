import React, { useState } from "react";
import Layout from "../../component/Layout";
import Input from "../../component/UI/Input";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as pageAction from '../../actions/pageAction';
const Page = (props) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [allCat, setAllCat] = useState([]);
  const dispatch=useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const page = useSelector((state) => state.page);
  useEffect(() => {
    setAllCat(createCategoryList(categories));
  }, [categories]);
  useEffect(() => {
    if(!page.loading){
      setShow(false);
    }
    console.log(page);
  }, [page]);
  const handleSavePage = (event) => {
    event.preventDefault();
    console.log({ type, categoryId, title, desc, banners, products });

    if(title===""){
      alert("Title is required");
      setShow(false);
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("category", categoryId);
    form.append("type", type);
    form.append("description", desc);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((pro, index) => {
      form.append("products", pro);
    });
    dispatch(pageAction.createPage(form));

    
  };
  const createCategoryList = (categories, options = []) => {
    for (let cat of categories) {
      options.push({
        value: cat._id,
        name: cat.name,
        parentId: cat.parentId,
        type: cat.type,
      });
      if (cat.children.length > 0) {
        createCategoryList(cat.children, options);
      }
    }
    return options;
  };
 
  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };
  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };

  const onCategoryChange = (e) => {
    setCategoryId(e.target.value);
    const cat = allCat.find((f) => f.value == e.target.value);
    setType(cat.type);
  };
  return (
    <Layout sidebar>
      <button onClick={() => setShow((prevState) => !prevState)}>
        create page
      </button>
      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>Create New Page</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSavePage}>
            <Form.Group>
              <select
                className="form-control"
                name="categoryId"
                onChange={onCategoryChange}
              >
                <option value={""}>Select Option</option>
                {allCat.length > 0
                  ? allCat.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.name}
                      </option>
                    ))
                  : null}
              </select>
            </Form.Group>

            <Input
              name="title"
              className="form-control"
              type="text"
              placeholder="Page Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              name="desc"
              className="form-control"
              type="text"
              placeholder="Enter Decription"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            {banners.length > 0
              ? banners.map((banner, index) => (
                  <Row key={index}>
                    <Col>{banner.name}</Col>
                  </Row>
                ))
              : null}
            <Input name="banners" type="file" onChange={handleBannerImages} />
            {products.length > 0
              ? products.map((pro, index) => (
                  <Row key={index}>
                    <Col>{pro.name}</Col>
                  </Row>
                ))
              : null}
            <Input type="file" name="products" onChange={handleProductImages} />
            <Button type="submit">create page</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default Page;
