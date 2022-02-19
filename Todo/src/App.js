import { Provider } from "react-redux";

import { RootRouter } from "./routing/RootRouter";
import "./App.css";
import { store } from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </div>
  );
}

export default App;
