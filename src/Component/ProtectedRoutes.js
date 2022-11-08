import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";



export const ProtectedRoutes = ({children})=> {

    const jwt = Cookies.get("jwt");
    
    if(jwt === undefined){
        return <Navigate  to='/login' />
    }
    return children

}