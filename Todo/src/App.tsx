import { Provider } from "react-redux";

import "./App.css";
import { store } from "./redux/store";
import { RootRouter } from "./navigation/RootRouter";

export function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <RootRouter />
      </div>
    </Provider>
  );
}

export default App;
