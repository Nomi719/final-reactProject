




function Orders(){
    return(
        <h1>Orders</h1>
    )
}
export default Orders;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// // import { fetchUserOrdersAsync } from './ordersSlice';
// import { formatPrice } from '../utilis/helpers';

// const OrdersPage = () => {
//   const dispatch = useDispatch();
//   const { data: orders, status } = useSelector(state => state.orders);

//   useEffect(() => {
//     dispatch(fetchUserOrdersAsync());
//   }, [dispatch]);

//   return (
//     <div className="orders-page">
//       <h2>My Orders</h2>
//       {status === 'pending' && <p>Loading orders...</p>}
//       {status === 'fulfilled' && (
//         <ul className="orders-list">
//           {orders.map((order) => (
//             <li key={order.id}>
//               <p>Order ID: {order.id}</p>
//               <p>Status: {order.status}</p>
//               <p>Total: {formatPrice(order.totalAmount)}</p>
//               <ul className="order-items">
//                 {order.cartProducts.map((product) => (
//                   <li key={product.id}>
//                     <p>{product.title}</p>
//                     <p>{formatPrice(product.price)} x {product.quantity}</p>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//       {status === 'rejected' && <p>Failed to fetch orders.</p>}
//     </div>
//   );
// };

// export default OrdersPage;