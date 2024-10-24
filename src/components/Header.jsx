import { MenuOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Badge, Image } from "antd"
import { Button } from "antd/es/radio"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { auth } from "../Utilities/firebase"



function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [islogin, setIsLogin] = useState()
  const { cart } = useContext(CartContext)
  console.log("cartItems", cart)

  const navigate = useNavigate()


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });

    return () => unsubscribe();   

  }, []);

  const isLogin = false

  const handleSignOut = () => {
    // Implement your sign-out logic here
    setIsLogin(false);
    navigate('/auth/signin'); // Redirect to login page after sign-out
    alert('Signed out successfully');
    setIsSignedIn(false);
  };
  return (
    <header className="text-gray-600 shadow body-font ">
      <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center justify-center" >
        <Link to={"/"}>
          <Image
            height={80}
            width={80}
            className="rounded-full"
            preview={false}
            src="src\Images\logo.png"
          />
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap p-3 items-center text-base justify-end ">
          <div className="md:hidden">
            <Button type="primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuOutlined />
            </Button>
          </div>
          <div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>

          
            <Link to={"/products"} className="mr-5 hover:text-gray-900 pro">
              Products
            </Link>
            <Link to={"/orders"} className="mr-5 hover:text-gray-900 pro">
              Orders
            </Link>
          </div>
        </nav>

            {isLogin ? (
              <>
                <Avatar size={50} icon={<UserOutlined />} />
                <Button onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <Button onClick={() => navigate("/auth")}>Login</Button>
            )}
          <div className="md:flex md:items-center md:gap-3 py-4">
            <Link to={"/carts"}>
              <Badge count={cart.length}>
                <ShoppingCartOutlined
                  style={{
                    fontSize: 30,
                    color: "blue",
                  }}
                />
              </Badge>
            </Link>
          </div>
      </div>
    </header>
  )
}
export default Header;