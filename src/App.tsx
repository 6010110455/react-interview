/* eslint-disable jsx-a11y/alt-text */
import logo from "./logo.svg";

import React, { useState, useEffect } from "react";
import axios from "axios";

import _ from "lodash";

function App() {
  const [carLists, setCarLists] = useState(null);

  console.log("carLists", carLists);

  useEffect(() => {
    const headers = {
      Authorization: "Bearer VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o",
    };
    axios
      .get(
        "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car",
        { headers }
      )
      .then((response) => setCarLists(response.data));
  }, []);

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
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {_.map(carLists?.items, (car, index) => (
              <div key={index} className="rounded-md shadow">
                <div>
                  <img
                    src={car?.fields?.photo}
                    className="object-cover w-full rounded-t-lg h-40"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src =
                        "https://admin.demo.eappsoft.net/imageComing.jpg";
                    }}
                  />
                </div>
                <div className="p-2">
                  <div className="text-xl font-bold">{car?.fields?.title}</div>
                  <div>{car?.fields?.price.toLocaleString()} THB/Day</div>
                  <div>ปุ่ม ADD</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="">FOOTER</div>
    </div>
  );
}

export default App;
