import React, { useContext, useEffect, useState } from "react";
import { Checkbox, Label } from "flowbite-react";
import {
  HttpCreateOrder,
  HttpGetCities,
  HttpGetStatus,
  HttpGetProducts,
  HttpGetPropertySize,
  HttpGetPropertyType,
} from "../../components/api/RequestAPI";
import useSWRImmutable from "swr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { UserContext } from "../../components/contexts/ContextProvider";
import CustomErrorPage from "../_error";
import { Stack } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";

const BookNowPage = () => {
  const propertyRegion = useSWRImmutable(
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
      process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_CITIES,
    HttpGetCities
  );
  // const propertySize = useSWRImmutable(
  //   process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
  //     process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_PROPERTY_SIZE,
  //   HttpGetPropertySize
  // );
  const propertyServiceOnSelect = useSWRImmutable(
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
      process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_PRODUCTS,
    HttpGetProducts
  );
  const propertyTypes = useSWRImmutable(
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
      process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_PROPERTY_TYPE,
    HttpGetPropertyType
  );

  const [steps, setSteps] = useState(0);
  const [valueDateTime, setValueDateTime] = useState();
  const [propertyService, setPropertyService] = useState([]);
  const [selectRegion, setSelectRegion] = useState();
  const [selectSize, setSelectSize] = useState();
  const [selectType, setSelectType] = useState();
  const [selectProduct, setSelectProduct] = useState();
  const [unitNumber, setUnitNumber] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetName, setStreetName] = useState("");
  const [province, setProvince] = useState("");
  const [vacant, setVacant] = useState(true);
  const [lockBoxPwd, setLockBoxPwd] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { users } = useContext(UserContext);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const todaysDate = month + "-" + day + "-" + year;
  const [valueDate, setValueDate] = useState("");
  const [extraService, setExtraServices] = useState([]);
  const [checkedService, setCheckedService] = useState([]);
  const [displayCheckService, setDisplayCheckService] = useState([]);
  const [selectedProductList, setSelectedProductList] = useState([]);
  const bookedTime = ["13:50:00", "14:50:00", "15:50:00", "16:50:00"];
  const [serviceDateSelected, setServiceDateSelected] = useState();
 
  if (!users.isLoggedIn) {
    return (
      <CustomErrorPage
        statusCode={401}
        redirect={"/login"}
        redirectTag={"login"}
        messages={
          "you must login before accessing this page, you will be directed to login page"
        }
      />
    );
  }

  const selectSizeHandler = (e) => {
    console.log("selectSizeHandler ", e);
    setDisplayCheckService([]);
    setCheckedService([]);
    setExtraServices([]);
    setSelectProduct();
    setSelectSize(e);
    setPropertyService(
      propertyServiceOnSelect?.data?.data?.data.filter(
        (item) => item.propertySizeId == e
      )[0].pricing
    );
  };
  const nextStep = (e) => {
    e.preventDefault();
    if (steps === 0 && validateService()) {
      const tempProductLust = [];
      tempProductLust.push(selectProduct);
      for (let x = 0; x < checkedService.length; x++) {
        tempProductLust.push(checkedService[x]);
      }
      setSelectedProductList(tempProductLust);
      setSteps(steps + 1);
      setErrorMsg(null);
    } else if (steps === 1) {
      setServiceDateSelected(
        valueDate?.getFullYear() +
          "-" +
          (valueDate?.getMonth() + 1) +
          "-" +
          valueDate?.getDate() +
          " " +
          valueDateTime
      );
      setSteps(steps + 1);
    } else if (steps === 2 && validateDetail()) {
      setSteps(steps + 1);
    }
  };

  const previousStep = () => {
    setSteps(steps - 1);
  };

  const checkedHandler = (e) => {
    var updatedList = [...checkedService];
    if (e.target.checked) {
      updatedList = [...checkedService, e.target.value];
    } else {
      updatedList.splice(checkedService.indexOf(e.target.value), 1);
    }
    setCheckedService(updatedList);

    const extraServiceList = [];
    for (let x = 0; x < updatedList.length; x++) {
      if (
        extraService.filter(
          (item) => item.productId === parseInt(updatedList[x])
        ).length > 0
      ) {
        extraServiceList.push(
          extraService.filter(
            (item) => item.productId === parseInt(updatedList[x])
          )[0]
        );
      }
    }
    setDisplayCheckService(extraServiceList);
  };
  //setSelectProduct
  const selectProductsHandler = (e) => {
    setDisplayCheckService([]);
    setCheckedService([]);
    setSelectProduct(e);
 

    const selectedProducts = propertyServiceOnSelect?.data?.data?.data.filter(
      (item) => item.propertySizeId === parseInt(selectSize)
    )[0];

    const filteredProductTypes = selectedProducts.pricing.filter(
      (item) => item.type.length == 1
    );
    const seletedProductTypes = selectedProducts.pricing.filter(
      (item) => item.productId === parseInt(e)
    )[0].type;
    for (let x = 0; x < seletedProductTypes.length; x++) {
      const index = filteredProductTypes.findIndex(
        (item) => item.productId === seletedProductTypes[x].id
      );
      filteredProductTypes.splice(index, 1);
    }
    setExtraServices(filteredProductTypes);
  };

  const validateDetail = () => {
    if (!streetNumber.match("\\d+")) {
      setErrorMsg("Street Number");
      return false;
    } else if (streetName.length <= 2) {
      setErrorMsg("Street Name");
      return false;
    } else if (
      !postalCode.match(
        "[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}"
      )
    ) {
      setErrorMsg("Postal Code");
      return false;
    } else {
      setErrorMsg(null);
      return true;
    }
  };
  const createOrderHandler = async () => {
    const httpCreateOrderResponse = await HttpCreateOrder(
      1,
      selectedProductList,
      unitNumber,
      streetNumber,
      streetName,
      selectRegion,
      selectType,
      selectSize,
      postalCode,
      serviceDateSelected,
      vacant,
      additionalComments,
      lockBoxPwd,
      users.userId
    );
     if (
      httpCreateOrderResponse.status === 200 &&
      httpCreateOrderResponse?.data?.success
    ) {
      setSteps(steps + 1);
    } else {
    }
  };

  const validateService = () => {
    if (selectProduct === undefined || selectProduct === "default") {
      setErrorMsg("service type");
      return false;
    } else if (selectSize === undefined || selectSize === "default") {
      setErrorMsg("property size");
      return false;
    } else if (selectRegion === undefined || selectRegion === "default") {
      setErrorMsg("property region");
      return false;
    } else if (selectType === undefined || selectType === "default") {
      setErrorMsg("property type");
      return false;
    } else return true;
  };

  return (
    <section>
      <div className="relative">
        <div className="min-h-screen w-full dark:bg-gray-900">
          <div className="p-5">
            <div className="mx-4 p-4">
              <div className="flex items-center">
                <div className="flex items-center text-teal-600 relative">
                  <div
                    className={
                      "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600"
                    }
                  ></div>
                  <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                    Service
                  </div>
                </div>
                <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
                <div className="flex items-center text-white relative">
                  <div
                    className={
                      steps >= 1
                        ? "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600"
                        : "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 "
                    }
                  ></div>
                  <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                    Time
                  </div>
                </div>
                <div
                  className={
                    steps >= 1
                      ? "flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"
                      : "flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"
                  }
                />
                <div className="flex items-center text-gray-500 relative">
                  <div
                    className={
                      steps >= 2
                        ? "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600"
                        : "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 }"
                    }
                  ></div>
                  <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                    Detail
                  </div>
                </div>
                <div
                  className={
                    steps >= 2
                      ? "flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"
                      : "flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"
                  }
                />
                <div className="flex items-center text-gray-500 relative">
                  <div
                    className={
                      steps >= 3
                        ? "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600"
                        : "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 "
                    }
                  ></div>
                  <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                    Confirm
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4">
              {errorMsg !== null ? (
                <div
                  className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  <span className="font-medium">{errorMsg} </span> is
                  missing/invalid
                </div>
              ) : null}
              {steps == 0 ? (
                <div className="justify-center items-center">
                  <Label
                    htmlFor="remember"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Property Size
                  </Label>
                  <div className="mb-6">
                    <select
                      id="propertySize"
                      value={selectSize}
                      onChange={(e) => selectSizeHandler(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected value={"default"}>
                        Choose property Size
                      </option>
                      {propertyServiceOnSelect?.data?.data?.data.map((row) => (
                        <option
                          value={row.propertySizeId}
                          key={row.propertySizeId}
                        >
                          {row.propertySizeName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <Label
                      htmlFor="remember"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Property Services
                    </Label>
                    <select
                      id="propertyService"
                      required={true}
                      value={selectProduct}
                      onChange={(e) => selectProductsHandler(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected value={"default"}>
                        Choose Service Type
                      </option>
                      {propertyService.map((row) => (
                        <option value={row.productId} key={row.productId}>
                          {row.productName} $ {row.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="justify-center items-center">
                    <Label
                      htmlFor="remember"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Extra Services
                    </Label>
                    <div className="relative p-4 mb-4 text-sm  bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-2">
                        {extraService.map((item, i) => (
                          <>
                            <Checkbox
                              id={item.productName}
                              key={item.productId}
                              checked={checkedService.includes(
                                String(item.productId)
                              )}
                              value={item.productId}
                              className="dark:border-gray-500 dark:bg-gray-600"
                              onChange={checkedHandler}
                            />
                            <Label htmlFor="remember">
                              {item.productName} ${item.price}
                            </Label>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <Label
                      htmlFor="remember"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Property Type
                    </Label>
                    <select
                      id="propertyType"
                      value={selectType}
                      onChange={(e) => setSelectType(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected value={"default"}>
                        Choose property Type
                      </option>
                      {propertyTypes?.data?.data?.data.map((row) => (
                        <option value={row.id} key={row.id}>
                          {row.type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-6">
                    <Label
                      htmlFor="remember"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Property Region
                    </Label>
                    <select
                      id="propertyRegion"
                      value={selectRegion}
                      onChange={(e) => setSelectRegion(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected value={"default"}>
                        Choose property region
                      </option>
                      {propertyRegion?.data?.data?.data.map((row) => (
                        <option value={row.id} key={row.id}>
                          {row.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : null}
              {steps == 1 ? (
                <div className="relative text-white p-4 mb-4 text-sm dark:bg-gray-700 rounded-lg ">
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Label
                        htmlFor="remember"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Service Date
                      </Label>
                      <Stack spacing={3}>
                        <MobileDatePicker
                          inputFormat="MM-dd-yyyy"
                          value={valueDate}
                          minDate={date}
                          onChange={(newValue) => {
                            setValueDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                input: { color: "#ffff" },
                              }}
                            />
                          )}
                        />
                      </Stack>
                    </LocalizationProvider>
                    <Label
                      htmlFor="remember"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Service Time
                    </Label>
                    <div className="mb-6">
                      <select
                        id="serviceTime"
                        value={valueDateTime}
                        onChange={(e) => setValueDateTime(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected value={"default"}></option>
                        {bookedTime.map((row) => (
                          <option value={row} key={row}>
                            {row}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}
              {steps == 2 ? (
                <>
                  <form
                    id="detail-form"
                    className={"block w-full p-3 rounded-lg dark:bg-gray-900"}
                  >
                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                      <div>
                        <label
                          htmlFor="unitNumber"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Unit Number
                        </label>
                        <input
                          type="text"
                          id="unitNumber"
                          value={unitNumber}
                          onChange={(e) => setUnitNumber(e.target.value)}
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder=""
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="streetNumber"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Street Number
                        </label>
                        <input
                          type="number"
                          id="streetNumber"
                          value={streetNumber}
                          onChange={(e) => setStreetNumber(e.target.value)}
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder=""
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="streetName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Street Name
                        </label>
                        <input
                          type="text"
                          id="streetName"
                          value={streetName}
                          onChange={(e) => setStreetName(e.target.value)}
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder=""
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="postalCode"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder=""
                          maxLength={6}
                          required={true}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="province"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Province
                        </label>
                        <input
                          type="text"
                          id="province"
                          value={province}
                          disabled={true}
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="ON"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lockBoxPwd"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Lock Box Password
                        </label>
                        <input
                          type="text"
                          id="lockBoxPwd"
                          value={lockBoxPwd}
                          onChange={(e) => setLockBoxPwd(e.target.value)}
                          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder=""
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        checked
                        id="default-radio-1"
                        type="radio"
                        name="default-radio"
                        defaultChecked={vacant}
                        onClick={() => setVacant(true)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Owner will be away
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        name="default-radio"
                        defaultChecked={!vacant}
                        onClick={() => setVacant(false)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Owner will be home
                      </label>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="lockBoxPwd"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Comments
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        value={additionalComments}
                        onChange={(e) => setAdditionalComments(e.target.value)}
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Your message..."
                      ></textarea>
                    </div>
                  </form>
                </>
              ) : null}
              {steps == 3 ? (
                <>
                  <div className="py-14 px-14 md:px-10 2xl:px-20 2xl:container 2xl:mx-auto dark:bg-gray-800 rounded-lg ">
                    <div className="grid grid-cols-6 gap-4">
                      <div
                        className={
                          "dark:text-white flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-lg "
                        }
                      >
                        <img src="/FacebookLogo.png" alt="Flowbite Logo" />
                        RealPro Inc.
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            291 N 4th St, San Jose, CA 95112, USA
                          </span>
                        </p>
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            <br></br>
                            {todaysDate}
                          </span>
                        </p>
                      </div>

                      <div className="col-start-1 col-end-7 ..."></div>
                    </div>
                    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                      <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                          <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                            Customer’s Cart
                          </p>

                          <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                              <img
                                className="w-full hidden md:block"
                                src={
                                  propertyServiceOnSelect?.data?.data?.data.filter(
                                    (item) => item.propertySizeId == selectSize
                                  )[0].image
                                }
                              />
                            </div>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                              <div className="w-full flex flex-col justify-start items-start space-y-8">
                                <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                  {
                                    propertyService.filter(
                                      (item) => item.productId == selectProduct
                                    )[0].productName
                                  }
                                </h3>
                              </div>
                              <div className="flex justify-between space-x-8 items-start w-full">
                                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                                  01
                                </p>
                                <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                  $
                                  {
                                    propertyService.filter(
                                      (item) => item.productId == selectProduct
                                    )[0].price
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          {displayCheckService.map((item, index) => (
                            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                              <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img
                                  className="w-full hidden md:block"
                                  src={
                                    propertyServiceOnSelect?.data?.data?.data.filter(
                                      (item) =>
                                        item.propertySizeId == selectSize
                                    )[0].image
                                  }
                                  alt="dress"
                                />
                              </div>
                              <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                  <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                    {item.productName} (Extra Service)
                                  </h3>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                  <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                                    01
                                  </p>
                                  <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                    ${item.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                          Customer
                        </h3>
                        <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                          <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                              <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase">
                                jc
                              </div>
                              <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800"></p>
                              </div>
                            </div>

                            <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              <p className="cursor-pointer text-sm leading-5 ">
                                {users.email}
                              </p>
                            </div>
                            <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              <p className="cursor-pointer text-sm leading-5 ">
                                {users.phone}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                              <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                  Service Property
                                </p>
                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    Type:{" "}
                                  </span>
                                  {
                                    propertyTypes?.data?.data?.data.filter(
                                      (item) => item.id == selectType
                                    )[0].type
                                  }
                                </p>
                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white ">
                                    Size:{" "}
                                  </span>
                                  {
                                    propertyServiceOnSelect?.data?.data?.data.filter(
                                      (item) =>
                                        item.propertySizeId == selectSize
                                    )[0].propertySizeName
                                  }
                                </p>
                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    Address:{" "}
                                  </span>
                                  {unitNumber +
                                    " - " +
                                    streetNumber +
                                    " " +
                                    streetName +
                                    " , " +
                                    propertyRegion?.data?.data?.data.filter(
                                      (item) => item.id == selectRegion
                                    )[0].name +
                                    " , " +
                                    province +
                                    " " +
                                    postalCode}
                                </p>
                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    Requested Schedule Time:{" "}
                                  </span>
                                  {serviceDateSelected}
                                </p>
                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    vacant:{" "}
                                  </span>
                                  {vacant
                                    ? "Owner will be away"
                                    : "Owner will be home"}
                                </p>
                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    Lock Box Password:{" "}
                                  </span>
                                  {lockBoxPwd}
                                </p>
                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    Comments:{" "}
                                  </span>
                                  {additionalComments}
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={createOrderHandler}
                            type="submit"
                            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            Book Confirmation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              {steps == 4 ? (
                <div
                  class="p-4 mb-4 text-lg text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                  role="alert"
                >
                  <span className="font-medium"></span> Thank you for your
                  booking, you will receive a email confirmation shortly. We
                  will contact you as long as possible
                </div>
              ) : null}

              <div className="flex p-2 mt-4">
                {steps != 0 && steps != 4 ? (
                  <button
                    className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
        hover:bg-gray-200
        bg-gray-100
        text-gray-700
        border duration-200 ease-in-out
        border-gray-600 transition"
                    onClick={previousStep}
                  >
                    Previous
                  </button>
                ) : null}
                <div className="flex-auto flex flex-row-reverse">
                  {steps != 3 && steps != 4 ? (
                    <button
                      className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
        hover:bg-teal-600
        bg-teal-600
        text-teal-100
        border duration-200 ease-in-out
        border-teal-600 transition"
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BookNowPage;
