import { useState } from "react";
import Context from "./Context";

function Provider({ children }) {
    const [user, setUser] = useState({
        'id': 0,
        'username': 'vcl',
        'nickname': 'nizzapom',
        'email': 'hohoho@',
        'password': '123',
        'playlist': []
    })
    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    )
}

export default Provider