import axios from "axios";
import { HTTP_HEADER, HTTP_TIMEOUT } from "../constant/Constants";
import { loadStripe } from "@stripe/stripe-js";

export const HttpLogin = async (email, password) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_LOGIN;
  const httpRequest = JSON.stringify({
    email: email,
    password: password,
  });
  console.log(httpURL);
  console.log(httpRequest);
  try {
    const response = await axios.post(httpURL, httpRequest, {
      headers: HTTP_HEADER,
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const HttpRegister = async (
  firstName,
  lastName,
  phone,
  email,
  password,
  accountTypeId
) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_REGISTER;
  const httpRequest = JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    password: password,
    accountTypeId: accountTypeId,
  });
  console.log(httpURL);
  console.log(httpRequest);
  try {
    const response = await axios.post(httpURL, httpRequest, {
      headers: HTTP_HEADER,
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpUpdateUser = async (
  firstName,
  lastName,
  phone,
  email,
  status,
  accountTypeId,
  userId
) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_USER_UPDATE;
  const httpRequest = JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    status: status,
    accountTypeId: accountTypeId,
    userId: userId,
  });
  console.log(httpURL);
  console.log(httpRequest);
  try {
    const response = await axios.post(httpURL, httpRequest, {
      headers: HTTP_HEADER,
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpActivate = async (activateToken) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_ACTIVATE;
  const httpRequest = JSON.stringify({
    activationToken: activateToken,
  });
  try {
    const response = await axios.post(httpURL, httpRequest, {
      headers: HTTP_HEADER,
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpResetPwd = async (email, verificationCode, password) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_RESET_PWD;
  const httpRequest = JSON.stringify({
    email: email,
    password: password,
    token: verificationCode,
  });
  console.log("HttpResetPwd request", httpRequest);
  try {
    const response = await axios.post(httpURL, httpRequest, {
      headers: HTTP_HEADER,
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpContactUs = async (name, email, phone, message) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_CONTACT_US;
  const httpRequest = {
    name: name,
    email: email,
    phone: phone,
    message: message,
  };
  console.log(httpURL);
  console.log(httpRequest);
  try {
    const response = await axios.post(httpURL, httpRequest, {
      headers: HTTP_HEADER,
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpGetOrders = async (
  userId,
  pageNo,
  pageSize,
  year,
  orderStatus
) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_ORDER;
  try {
    const response = await axios.get(
      httpURL,
      {
        params: {
          pageNo: pageNo,
          pageSize: pageSize,
          year: year,
          userId: userId,
          status: orderStatus,
        },
      },
      {
        timeout: HTTP_TIMEOUT,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpGetOrderDetailByUserIDOrderID = async (userId, orderId) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_ORDER_DETAILS_USERID_ORDERID +
    userId +
    "&orderId=" +
    orderId;
  try {
    const response = await axios.get(httpURL, {
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpForgotPassword = async (email) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_FORGOTPASSWORD;
  const httpRequest = JSON.stringify({
    email: email,
  });
  console.log(httpURL);
  console.log(httpRequest);
  try {
    const response = await axios.post(httpURL, httpRequest, {
      headers: HTTP_HEADER,
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpCreateOrder = async (
  province,
  productId,
  unitNumber,
  streetNumber,
  streetName,
  city,
  propertyTypeId,
  propertySize,
  postalCode,
  scheduleTime,
  isVacant,
  note,
  accessCode,
  userId
) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_POST_CREATE_ORDER;
  const httpRequest = JSON.stringify({
    productId: productId,
    address: {
      unitNumber: unitNumber,
      streetNumber: streetNumber,
      streetName: streetName,
      city: city,
      propertyTypeId: propertyTypeId,
      propertySize: propertySize,
      postalCode: postalCode,
      province: province,
    },
    scheduleTime: scheduleTime,
    isVacant: isVacant,
    note: note,
    accessCode: accessCode,
    userId: userId,
  });
  console.log(httpURL);
  console.log(httpRequest);
  try {
    const response = await axios.post(httpURL, httpRequest, {
      headers: HTTP_HEADER,
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpPayment = async (email, name, items) => {
  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_PAYMENT;
  const httpRequest = {
    email: email,
    firstName: name,
    items: items,
  };
  console.log("HttpPayment Request:", httpRequest);
  try {
    const response = await axios.post(httpURL, httpRequest, {
      headers: HTTP_HEADER,
      timeout: HTTP_TIMEOUT,
    });
    return (await stripe).redirectToCheckout({
      sessionId: response.data.data.id,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpGetCities = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const HttpGetPropertySize = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpGetPropertyType = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpGetProducts = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpMediaUpload = async (
  orderId,
  userId,
  productTypeId,
  files
) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_POST_UPLOAD_MEDIA;
  const formData = new FormData();
  console.log("httpURL  ", httpURL);
  formData.append("orderId", orderId);
  formData.append("userId", userId);
  formData.append("productTypeId", productTypeId);
  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]);
  }
  try {
    const response = await axios.post(httpURL, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpAssignOrder = async (orderId, photographerId) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_POST_ASSIGN_ORDER;
  const httpRequest = {
    orderId: orderId,
    photographerId: photographerId,
  };
  console.log("HttpPayment Request:", httpRequest);
  try {
    const response = await axios.post(httpURL, httpRequest, {
      headers: HTTP_HEADER,
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpGetAdminUsers = async (obj) => {
  try {
    const response = await axios.get(
      obj.url,
      {
        params: {
          accountTypeId: obj.accountTypeId,
        },
      },
      {
        timeout: HTTP_TIMEOUT,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpCommonGetSWR = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const HttpGetStatus = async (url) =>
  await axios.get(url).then((res) => res.data);

export const HttpGetDashboard = async (userId) => {
  const httpURL =
      process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_GET_DASHBOARD +
      userId;
  try {
    const response = await axios.get(httpURL, {
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const HttpAddStaffUnvaTime = async (photographerId,date,startTime,endTime) => {
  const httpURL =
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_BASE_PATH +
    process.env.NEXT_PUBLIC_REAL_PRO_STUDIO_POST_STAFF_UNAVA_TIME;
  const httpRequest = {
    photographerId: photographerId,
    date: date,
    startTime: startTime,
    endTime: endTime
  };
  console.log("HttpAddStaffUnvaTime Request:", httpRequest);
  try {
    const response = await axios.post(httpURL, httpRequest, {
      headers: HTTP_HEADER,
      timeout: HTTP_TIMEOUT,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
