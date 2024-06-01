// Importing the createContext function from react
import { createContext } from "react"; // createContext is used to create a Context object

// Creating a Context object
const Context = createContext(); // This context object will be used to share state globally across the component tree

// Exporting the Context object as the default export
export default Context; // This allows the Context object to be imported and used in other parts of the application
