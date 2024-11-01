
import React, { useState, useEffect } from "react";
import { collection, doc, getDocs, query, where, updateDoc } from "../Utilities/firebase";
import { db, auth } from "../Utilities/firebase"; // Assuming you have these imports
import numeral from "numeral";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), where("user", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFulfillOrder = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: "fulfilled" });
      // Update local state if needed
      setOrders(
        orders.map((order) => (order.id === orderId ? { ...order, status: "fulfilled" } : order))
      );
    } catch (error) {
      console.error("Error fulfilling order:", error);
      setError("Failed to fulfill order. Please try again later.");
    }
  };

  return (
    <div className="orders-page flex flex-col items-center justify-center w-full">
      <h2>My Orders</h2>
      {isLoading && <p className="text-center mb-4">Loading orders...</p>}
      {error && <p className="text-center mb-4 text-red-500">Error: {error}</p>}
      {orders.length > 0 && (
        <ul className="orders-list list-none p-0">
          {orders.map((order) => (
            <li key={order.id} className="order flex flex-col items-start justify-between p-4 border rounded-md shadow-md mb-2">
              <p className="text-base font-medium">Order ID: {order.id}</p>
              <p className={`text-sm ${order.status === "pending" ? "text-red-500" : "text-green-500"}`}>Status: {order.status}</p>
              <p className="text-sm">Total: {order.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              {order.status === "pending" && (
                <button onClick={() => handleFulfillOrder(order.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Fulfill Order
                </button>
              )}

              <h3 className="text-lg font-bold mt-4">Order Items:</h3>
              <ul className="order-items list-none p-0">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <p>{item.title}</p>
                    <p>{item.quantity}</p>
                    <p>{`${(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} x ${item.quantity}`}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      {orders.length === 0 && !isLoading && !error && <p className="text-center mb-4">No orders found.</p>}
    </div>
  );
};

export default OrdersPage;



// -------------------xxxxxxxxxxxxxxxxx------------

// import React, { useState, useEffect } from "react";
// import { collection, doc, getDocs, query, updateDoc, where } from "../Utilities/firebase";
// import { db, auth } from "../Utilities/firebase"; // Assuming you have these imports

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const q = query(collection(db, "orders"), where("user", "==", auth.currentUser.uid)); // Filter by user
//         const querySnapshot = await getDocs(q);
//         const fetchedOrders = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setOrders(fetchedOrders);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setError("Failed to fetch orders. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleFulfillOrder = async (orderId) => {
//     try {
//       const orderRef = doc(db, "orders", orderId);
//       await updateDoc(orderRef, { status: "fulfilled" });
//       // Update local state if needed
//       setOrders(
//         orders.map((order) => (order.id === orderId ? { ...order, status: "fulfilled" } : order))
//       );
//     } catch (error) {
//       console.error("Error fulfilling order:", error);
//       setError("Failed to fulfill order. Please try again later.");
//     }
//   };

//   return (
//     <div className="orders-page flex flex-col items-center justify-center w-full">
//       <h2>My Orders</h2>
//       {isLoading && <p className="text-center mb-4">Loading orders...</p>}
//       {error && <p className="text-center mb-4 text-red-500">Error: {error}</p>}
//       {orders.length > 0 && (
//         <ul className="orders-list list-none p-0">
//           {orders.map((order) => (
//             <li key={order.id} className="order flex items-center justify-between p-4 border rounded-md shadow-md mb-2">
//               <div>
//                 <p className="text-base font-medium">Order ID: {order.id}</p>
//                 <p className={`text-sm ${order.status === "pending" ? "text-red-500" : "text-green-500"}`}>Status: {order.status}</p>
//               </div>
//               {order.status === "pending" && (
//                 <button onClick={() => handleFulfillOrder(order.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                   Fulfill Order
//                 </button>
//               )}
//               <ul className="order-items list-none p-0 mt-2">
//                 {/* Display order details (items, prices, etc.) based on your data structure */}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//       {orders.length === 0 && !isLoading && !error && <p className="text-center mb-4">No orders found.</p>}
//     </div>
//   );
// };

// export default OrdersPage;