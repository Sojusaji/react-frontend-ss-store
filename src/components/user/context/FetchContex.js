import { createContext, useState } from "react";

export const FetchContext = createContext(null)

export default function FetchProvider({ children }) {
    const [banner, setBanner] = useState([])
    const [rowOne, setRowOne] = useState([])
    const [rowTwo, setRowTwo] = useState([])
    const [cartItem, setCartItem] = useState([])
    const [carCount, setCartCount] = useState([])
    const [user, setUser] = useState([null])

    return (
        < FetchContext.Provider value={{
            banner, setBanner, rowOne, setRowOne, rowTwo, setRowTwo, cartItem,
            setCartItem, carCount, setCartCount, user, setUser
        }}>
            {children}
        </FetchContext.Provider >)
}