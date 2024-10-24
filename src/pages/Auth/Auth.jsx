import { Button } from "antd";
import { Link } from "react-router-dom";



function Auth(){
    return(

        <div className="flex justify-center items-center my-52">

            <Button > Login with github</Button>
          <Link to={"signin"}>  <Button > Login with Email</Button></Link>
            <Button > Login with Google</Button>
        </div>
    )
}
export default Auth;