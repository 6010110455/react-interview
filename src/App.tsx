import logo from "./logo.svg";

function App() {
  return (
    <div className="font-inter">
      {/* NAVBAR */}
      <div className="shadow-lg">
        <div className="mx-20 flex justify-between h-20">
          <div className="flex">
            <img src={logo} alt="logo" />
            <span className="my-auto font-bold text-xl">Drivehub</span>
          </div>
          <div className="flex">
            {/* <img src={logo} alt="logo" /> */}
            <span className="my-auto">Cart (0)</span>
          </div>
        </div>
      </div>

      {/* FILTER DIV */}
      <div className="flex justify-between  mx-20 my-8">
        <div className="text-2xl font-bold">Car Available</div>
        <div className="flex">
          <div>Search Car</div>
          <div>Sort Price</div>
        </div>
      </div>

      {/* LISTS CARS */}
      <div className="flex min-h-screen   bg-gray-100">
        <div className="mx-20 w-full">
          <div className="w-full">list car</div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="">FOOTER</div>
    </div>
  );
}

export default App;
