import Layout from "../../component/Layout";
import Input from "../../component/UI/Input";
import { Row, Col } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import {useSelector,useDispatch} from 'react-redux';
import {login} from '../../actions/authAction';

const Signup = (props) => {

  const dispatch=useDispatch();
  const loginMethod=(e)=>{
    e.preventDefault();
    const user={name:"bilal",last:"rasheed"};
    dispatch(login(user));
  }

  return (
    <div>
      <Layout>
        <Row style={{marginTop:50}}>
          <Col md={{ span: 5, offset: "3" }}>

            <Form>
              <Row>
                <Col md={6}>
                <Input
                Label={"First Name"}
                type="text"
                placeholder="First Name"
                value={""}
                onChange={() => {}}
              />
              
                </Col>
                <Col md={6}>
                <Input
                Label={"Last Name"}
                type="text"
                placeholder="last Name"
                value={""}
                onChange={() => {}}
              />
                </Col>
              </Row>
              <Input
                Label={"Email"}
                type="email"
                placeholder="Enter Your email"
                value={""}
                onChange={() => {}}
              />
              <Input
                Label={"Password"}
                type="password"
                placeholder="Enter Your Password"
                value={""}
                onChange={() => {}}
              />
              <Button variant="primary" type="submit" onClick={loginMethod}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Signup;
