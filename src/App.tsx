/* eslint-disable jsx-a11y/alt-text */
import logo from "./logo.svg";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import _ from "lodash";

function App() {
  const [carLists, setCarLists] = useState(null);
  const [carListsSearch, setCarListsSearch] = useState(null);
  const [inputText, setInputText] = useState("");

  console.log("inputText", inputText);
  console.log("carListsSearch", carListsSearch);

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);

    if (carLists?.items) {
      const filteredData = _.filter(carLists?.items, (car) => {
        //if no input the return the original
        if (lowerCase === "") {
          return carLists?.items;
        }
        //return the item which contains the user input
        else {
          return car?.fields?.title.toLowerCase().includes(lowerCase);
        }
      });

      // console.log("filteredData", filteredData);
      setCarListsSearch(filteredData);
    }
  };

  // console.log("carLists", carLists);

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
            <span className="my-auto">Cart (0)</span>
          </div>
        </div>
      </div>

      {/* FILTER DIV */}
      <div className="flex justify-between  mx-20 my-8">
        <div className="text-2xl font-bold">Car Available</div>
        <div className="flex">
          <div>
            <TextField
              variant="outlined"
              fullWidth
              label="Search Car"
              size="small"
              onChange={inputHandler}
            />
          </div>
          <div>Sort Price</div>
        </div>
      </div>

      {/* LISTS CARS */}
      <div className="flex bg-gray-100">
        <div className="mx-20 w-full mb-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {_.map(
              inputText === "" ? carLists?.items : carListsSearch,
              (car, index) => (
                <div key={index} className="rounded-lg shadow bg-white">
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
                  <div className="p-3">
                    <div className="text-xl font-bold">
                      {car?.fields?.title}
                    </div>
                    <div>{car?.fields?.price.toLocaleString()} THB/Day</div>
                    <div className="bg-blue-600 text-white rounded-md my-auto text-center p-3 mt-2 cursor-pointer hover:bg-blue-400">
                      Add to cart
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-blue-950">FOOTER</div>
    </div>
  );
}

export default App;
