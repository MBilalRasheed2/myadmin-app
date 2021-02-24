import {useState,useEffect} from 'react';
import Layout from "../../component/Layout";
import Input from "../../component/UI/Input";
import { Row, Col } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import {useSelector,useDispatch} from 'react-redux';
import {login,isUserLoggedIn} from '../../actions/authAction';
import {Redirect} from 'react-router-dom';

const Signin = (props) => {
  const auth=useSelector(state=>state.auth);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const dispatch=useDispatch();
  const loginMethod=(e)=>{
    e.preventDefault();
    const user={email,password};
    dispatch(login(user));
  }
  useEffect(()=>{
    dispatch(isUserLoggedIn());
  },[]);
  if(auth.authenticate){
    return <Redirect to={`/`} />
  }
  return (
    <div>
      <Layout>
      <Row style={{marginTop:50}}>
          <Col md={{ span: 5, offset: "3" }}>
            <Form onSubmit={loginMethod}>
              <Input
                Label={"Email"}
                type="email"
                placeholder="Enter Your email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                
              />
              <Input
                Label={"Password"}
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                
              />
              <Button variant="primary" type="submit" >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Signin;
