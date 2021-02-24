import { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import {
  addCategory,
  updateCategories,
} from "../../actions/categoryAction";
import * as categoryActions from "../../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Container } from "react-bootstrap";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import AddCategoryModal from "./Com/AddCategoryModal";
import RenderDeleteCategoryModal from "./Com/RenderDeleteCategoryModal";
import RenderUpdateCategoryModal from "./Com/RenderUpdateCategoryModal";

import {
  BiCheckbox,
  BiCheckboxChecked,
  BiCaretDown,
  BiCaretRight,
  BiFolderOpen,
  BiFolder,
} from "react-icons/bi";
import { IoIosCloudy, IoIosAdd, IoIosTrash } from "react-icons/io";
const Category = (props) => {
  const [show, setShow] = useState(false);
  const [editCategoryShow, setEditCategoryShow] = useState(false);
  const [deleteCategoryShow, setDeleteCategoryShow] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryparentId, setCategoryparentId] = useState("");
  const [checked, setChecked] = useState([]);
  const [expended, setExpended] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expendedArray, setExpendedArray] = useState([]);

  const categories = useSelector((state) => state.category.categories);

  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  const handleEditCategoryClose = (e) => {
    const form = new FormData();
    checkedArray.forEach((cat, index) => {
      form.append("_id", cat.value);
      form.append("name", cat.name);
      form.append("parentId", cat.parentId ? cat.parentId : "");
      form.append("type", cat.type);
    });
    expendedArray.forEach((cat, index) => {
      form.append("_id", cat.value);
      form.append("name", cat.name);
      form.append("parentId", cat.parentId ? cat.parentId : "");

      form.append("type", cat.type);
    });
    console.log({ checkedArray, expendedArray });
    dispatch(updateCategories(form));
    setEditCategoryShow(false);
  };
  const showUpdateCatoryModalHandler = () => {
    updateCategoryHandler();
    setEditCategoryShow(true);
  };
  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", categoryparentId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategoriesList = (allCategories) => {
    let myCategories = [];

    for (let cat of allCategories) {
      myCategories.push({
        value: cat._id,
        label: cat.name,
        children:
          cat.children.length > 0 ? renderCategoriesList(cat.children) : null,
      });
    }
    return myCategories;
  };
  const createCategoryList = (categories, options = []) => {
    for (let cat of categories) {
      options.push({
        value: cat._id,
        name: cat.name,
        parentId: cat.parentId,
        type: cat.type
      });
      if (cat.children.length > 0) {
        createCategoryList(cat.children, options);
      }
    }
    return options;
  };
  const updateCategoryHandler = () => {
    console.log({checked});
    const getAll = createCategoryList(categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = getAll.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expended.length > 0 &&
      expended.forEach((categoryId, index) => {
        const category = getAll.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpendedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updateCheckArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updateCheckArray);
    } else if (type == "expended") {
      const updateExpendedArray = expendedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpendedArray(updateExpendedArray);
    }
  };

  const deleteCategoryShowHandler = () => {
    updateCategoryHandler();
    setDeleteCategoryShow(true);
  };
  const deleteCategoryCloseHandler = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    // const expendedIdsArray = expendedArray.map((item, index) => ({
    //   _id: item.value,
    // }));
    // const checkedAndExpendedIds = checkedIdsArray.concat(expendedIdsArray);

    dispatch(categoryActions.deleteCategories(checkedIdsArray)).then(
      (result) => {
        if (result) {
          dispatch(categoryActions.getAllCategories());
        }
      }
    );
    setDeleteCategoryShow(false);
  };

  return (
    <div>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Categories</h1>
                <div>
                  <Button variant="primary" onClick={handleShow}>
                    <IoIosAdd /> Add
                  </Button>

                  <Button onClick={showUpdateCatoryModalHandler}>
                    <IoIosCloudy /> Edit{" "}
                  </Button>
                  <Button onClick={deleteCategoryShowHandler}>
                    <IoIosTrash />
                    Delete{" "}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <CheckboxTree
                nodes={renderCategoriesList(categories)}
                checked={checked}
                expanded={expended}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpended(expanded)}
                icons={{
                  check: <BiCheckboxChecked />,
                  uncheck: <BiCheckbox />,
                  halfCheck: <BiCheckbox />,
                  expandClose: <BiCaretRight />,
                  expandOpen: <BiCaretDown />,
                  parentClose: <BiFolder />,
                  parentOpen: <BiFolderOpen />,
                }}
              />
            </Col>
          </Row>
          <Row></Row>
        </Container>
        <AddCategoryModal
          show={show}
          handleClose={handleClose}
          categoryName={categoryName}
          createList={createCategoryList(categories)}
          categoryparentId={categoryparentId}
          handleImageUpload={handleImageUpload}
          setCategoryName={setCategoryName}
          setCategoryparentId={setCategoryparentId}
        />

        <RenderUpdateCategoryModal
          editCategoryShow={editCategoryShow}
          handleEditCategoryClose={handleEditCategoryClose}
          checkedArray={checkedArray}
          expendedArray={expendedArray}
          createCategoryList={createCategoryList(categories)}
          handleCategoryInput={handleCategoryInput}
        />

        <RenderDeleteCategoryModal
          show={deleteCategoryShow}
          deleteCategoryCloseHandler={deleteCategoryCloseHandler}
          expendedArray={expendedArray}
          checkedArray={checkedArray}
        />
      </Layout>
    </div>
  );
};

export default Category;
