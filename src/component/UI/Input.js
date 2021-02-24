import { Form, Button } from "react-bootstrap";
const Input = (props) => {
  return (
    <Form.Group>
     {props.Label &&  <Form.Label>{props.Label}</Form.Label>} 
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </Form.Group>
  );
};

export default Input;
