// Importing required modules from react
import { useState } from "react"; // useState hook for managing state
import Context from "./Context"; // Importing Context for global state management

// Provider component to wrap the application and provide global state
function Provider({ children }) {
    // State hook to manage user data
    const [user, setUser] = useState({
        'id': 0, // User ID
        'username': 'vcl', // Username
        'nickname': 'nizzapom', // Nickname
        'email': 'hohoho@', // Email
        'password': '123', // Password
        'playlist': [] // Playlist array (initially empty)
    });

    // Returning the Context.Provider component with the user state and setUser function
    return (
        <Context.Provider value={{ user, setUser }}>
            {children} // Render child components that consume the context
        </Context.Provider>
    );
}

// Exporting the Provider component as the default export
export default Provider;
