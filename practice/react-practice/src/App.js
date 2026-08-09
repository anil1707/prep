
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouteConfig from './RouteConfig';
// import { UserContextProvider } from './context/userContext';
import { Provider } from "react-redux";
import store from './redux/store';

function App() {
  return (
    <BrowserRouter>
    {/* <UserContextProvider> */}
    <Provider store={store}>
    <div className="App">
      <RouteConfig/>
    </div>
    {/* </UserContextProvider> */}
    </Provider>
    </BrowserRouter>
  );
}

export default App;
