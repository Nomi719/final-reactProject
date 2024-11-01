


import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Image, message } from "antd";
import CheckOutModal from "../components/CheckOutModal";
import { addDoc, auth, collection, db } from "../Utilities/firebase";



function Carts(){
    const {cart, removeCart, updateCart, clearCart} = useContext(CartContext);

    useContext(CartContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const totalQuantity = cart.reduce(
        (value, item) => value + item.quantity,
        0
      );

      const totalPrice = cart.reduce(
        (value, item) => value + item.quantity * item.price,
        0
      );


      const checkoutOrder = async (values) => {
        const checkoutObj = {
          ...values,
          totalPrice,
          totalQuantity,
          status: "pending",
          user: auth.currentUser ? auth.currentUser.uid : "guest",
          items: cart.map(
            (data) =>
              `Item : ${data.title} , Price : ${data.price}  (${data.quantity}) `
          ),
        };
        const docRef = collection(db, "orders");
    addDoc(docRef, checkoutObj).then(() =>
      message.success("Your order is placed")
    );

    const encodedTxt = encodeURIComponent(JSON.stringify(checkoutObj));
    console.log("values=>", encodeURIComponent(JSON.stringify(checkoutObj)));
    window.open(`https://wa.me/923423445241?text=${encodedTxt}`);
    clearCart();
    setIsModalOpen(false)
      }
    return(
        <div className="container mx-auto">
           <CheckOutModal
        isModalOpen={isModalOpen}
        handleOk={() => setIsModalOpen(false)}
        handleCancel={() => setIsModalOpen(false)}
        checkoutOrder={checkoutOrder}
      />
          <div className="flex gap-4 my-4">
            <div className="flex-grow border border-blue-700 rounded flex justify-center items-center py-5">
              <h1 className="text-2xl font-semibold">{totalQuantity}</h1>
            </div>
            <div className="flex-grow border border-blue-700 rounded flex justify-center items-center py-5">
              <h1 className="text-2xl font-semibold">${Math.floor(totalPrice)}</h1>
            </div>
            <div 
            onClick={openModal}
            className=" cursor-pointer flex-grow border border-blue-700 rounded flex justify-center items-center py-5">
              Proceed to checkOut
            </div>
          </div>
          {cart.map((item) =>(
            <div key={item.id} className="flex border my-3 py-3">
              <Image src={item.thumbnail} height={100} width={100} />
               <div className="pl-3">
            <h1>{item.title}</h1>
            <h1>${item.price}</h1>

            <div className="flex gap-3 my-3">
              <Button className="outline-green-900 bg-green-600 text-white" onClick={() => updateCart(item.id, "plus")}>
                Plus
              </Button>
              <h1>{item.quantity}</h1>
              <Button className="outline-red-800 bg-red-600 text-white"
                onClick={() => {
                  if (item.quantity <= 1) {
                    removeCart(item.id);
                  } else {
                    updateCart(item.id, "minus");
                  }
                }}
              >
                Minus
              </Button>
            </div>
          </div>
        </div>
          ))}
        </div>
    )
}
export default Carts;
