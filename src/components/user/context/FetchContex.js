import { createContext, useState } from "react";

export const FetchContext = createContext(null)

export default function FetchProvider({ children }) {
    const [userData,setUserData]=useState([null])
    const [banner, setBanner] = useState([])
    const [rowOne, setRowOne] = useState([])
    const [rowTwo, setRowTwo] = useState([])
    const [cartItem, setCartItem] = useState([])
    const [carCount, setCartCount] = useState([])
   
    return (
        < FetchContext.Provider value={{ banner, setBanner, rowOne, setRowOne, rowTwo, setRowTwo, cartItem,
         setCartItem ,userData,setUserData ,carCount, setCartCount}}>
            {children}
        </FetchContext.Provider >)
}