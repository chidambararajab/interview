import logo from "./logo.svg";
import "./App.css";
import FetchedHere from "./Implementations/FetchedHere";
import FetchIsOnline from "./Implementations/FetchIsOnline";

function App() {
  return (
    <div className="App">
      {/* <FetchedHere /> */}
      <FetchIsOnline />
    </div>
  );
}

export default App;
