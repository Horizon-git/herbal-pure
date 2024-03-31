/* eslint-disable no-console */
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchOrderDetails } from '../../features/orderDetailsSlice';
import { Notification } from '../../components/Notification/Notification';
import { Loader } from '../../components/Loader/Loader';
import { OrderSummary } from '../../components/OrderSummary/OrderSummary';
import './OrderSuccessPage.scss';

export const OrderSuccessPage = () => {
  const { orderId = '' } = useParams();
  const dispatch = useAppDispatch();
  const { orderDetails, hasError, loading } = useAppSelector(
    state => state.orderDetails,
  );
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchOrderDetails(orderId));
  }, [dispatch, orderId]);

  if (loading) {
    return <Loader />;
  }

  if (hasError) {
    return <Notification message="Failed to load the order details." />;
  }

  return (
    <div className="order-details">
      <h1 className="order-details__title">
        Thank you! Your order has been placed.
      </h1>
      <div className="order-details__container">
        <div className="order-details__content">
          <div className="order-details__block">
            <h2 className="order-details__sub-title">
              Your order # is: {orderDetails?.id}
            </h2>
            <p className="order-details__text">
              An email receipt including the details about your order has been
              sent to {user?.email}
            </p>
          </div>
          <div className="order-details__block">
            <h2 className="order-details__sub-title">Futher instructions</h2>
            <p className="order-details__text">
              Our manager will contact you to confirm the details of your order
              by this number: {user?.phone_number}
            </p>
          </div>
          <div className="order-details__block">
            <h2 className="order-details__sub-title">Payment Method</h2>
            <p className="order-details__text">Cash</p>
          </div>
          <Link to="/store" className="order-details__link">
            Continue shopping
          </Link>
        </div>
        {orderDetails && (
          <div className="order-details__summary">
            <OrderSummary order={orderDetails} />
          </div>
        )}
      </div>
    </div>
  );
};
