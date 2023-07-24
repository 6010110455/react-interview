/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import logo from "./logo.svg";

import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import _ from "lodash";

function App() {
  const [cart, setCart] = useLocalStorageState<CartProps>("cart", {});

  const [carLists, setCarLists] = useState(null);
  const [carListsSearch, setCarListsSearch] = useState(null);
  const [inputText, setInputText] = useState("");
  const [selectSort, setSelectSort] = useState("");

  console.log("inputText", inputText);
  console.log("carListsSearch", carListsSearch);
  console.log("carLists?.items", carLists?.items);

  // const numAscending = [...carLists?.items].sort(
  //   (a, b) => a?.fields?.price - b?.fields?.price
  // );
  // const numDescending = [...carLists?.items].sort(
  //   (a, b) => b?.fields?.price - a?.fields?.price
  // );
  // console.log("numDescending", numDescending);
  // console.log("numAscending ", numAscending);

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

  // const sortProductLow = _.orderBy(
  //   carLists?.items,
  //   ["fields.price"],
  //   ["asc", "desc"]
  // );
  // console.log("sortProduct1", sortProductLow);

  // const sortProductHigh = _.orderBy(
  //   carLists?.items,
  //   ["fields.price"],
  //   ["desc", "asc"]
  // );
  // console.log("sortProduct2", sortProductHigh);

  const handleChangeSortBy = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectSort(event.target.value);
    if (event.target.value === "price_low") {
      const sortProduct = _.orderBy(
        carLists?.items,
        ["fields.price"],
        ["asc", "desc"]
      );
      setCarListsSearch(sortProduct);
      console.log("sortProduct price_low", sortProduct);
    } else if (event.target.value === "price_hight") {
      const sortProduct = _.orderBy(
        carLists?.items,
        ["fields.price"],
        ["desc", "asc"]
      );
      setCarListsSearch(sortProduct);
      console.log("sortProduct price_hight", sortProduct);
    }
  };

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
      <div className="md:flex md:justify-between mx-10 md:mx-20 my-8">
        <div className="text-2xl font-bold my-auto mb-2 md:mb:0">
          Car Available
        </div>
        <div className="md:flex gap-2">
          <div className="w-full md:w-1/2 mb-2 md:mb:0">
            <TextField
              variant="outlined"
              fullWidth
              label="Search Car"
              size="small"
              onChange={inputHandler}
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">เรียงตาม</InputLabel>
                <Select
                  value={selectSort}
                  defaultValue={"price_low"}
                  size="small"
                  label="เรียงตาม"
                  onChange={handleChangeSortBy}
                >
                  <MenuItem
                    value={"price_hight"}
                    key={"2"}
                    sx={{ minWidth: 300 }}
                  >
                    ราคาสูง ไป ต่ำ
                  </MenuItem>
                  <MenuItem
                    value={"price_low"}
                    key={"3"}
                    sx={{ minWidth: 300 }}
                  >
                    ราคาต่ำ ไป สูง
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      {/* LISTS CARS */}
      <div className="flex bg-gray-100">
        <div className="mx-10 md:mx-20 w-full mb-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {_.map(
              inputText === "" && selectSort === ""
                ? carLists?.items
                : carListsSearch,
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
      <div className="bg-blue-950 text-white w-full">
        <div className="mx-20 md:flex justify-between py-8">
          <div className="w-full">
            <a className="font-bold mb-2">Drivehub Co.,Ltd</a>
            <div className="w-full">
              <div className="w-full text-sm">
                193-195 Lake Rajada Office Complex,
              </div>
              <div className="w-full text-sm">
                Ratchadapisek road, Khlong Toei, Bangkok
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end text-sm my-auto">
            Drivehub 2023
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
function useLocalStorageState<T>(arg0: string, arg1: {}): [any, any] {
  throw new Error("Function not implemented.");
}
