import React, { useEffect } from "react";
import Layout from "../../component/Layout";
import { Card, ProgressBar, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as orderActions from "../../actions/orderAction";
const Order = (props) => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderActions.loadOrder());
    
  }, [order.orders.items]);

  return (
    <div>
      <Layout sidebar>
        {order.orders.length > 0 ? (
          <Card>
            <Card.Body>
              {order.orders &&
                order.orders.map((order, index) => (
                  <Card key={index}>
                    <Card.Body>
                      <ProgressBar>
                        <ProgressBar
                          striped
                          variant="success"
                          now={35}
                          key={1}
                          
                        />
                        <ProgressBar variant="warning" now={20} key={2} />
                        <ProgressBar
                          striped
                          variant="danger"
                          now={10}
                          key={3}
                        />
                      </ProgressBar>
                    </Card.Body>
                  </Card>
                ))}
            </Card.Body>
          </Card>
        ) : (
          <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>

            <Spinner  animation="grow" variant="dark" />
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Order;
