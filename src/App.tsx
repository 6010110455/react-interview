import logo from "./logo.svg";

import "./App.css";

function App() {
  return (
    <div className="font-inter">
      <div className="app-header">
        <img src={logo} alt="logo" /> <span>Drivehub</span>
      </div>
      <div className="flex">
        <div>Car list</div>
        <div>Cart</div>
      </div>
      <div className="app-footer">FOOTER</div>
    </div>
  );
}

export default App;
