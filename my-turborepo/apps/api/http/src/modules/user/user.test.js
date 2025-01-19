// before writing api -> writing test
// import 'dotenv/config';
require("dotenv").config();
const axios = require("axios");
// import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_BASE_URL;
console.log("BACKEND_URL", BACKEND_URL);

const failTheTest = () => {
  expect(true).toBe(false);
};

test("identity test", ()=>{
  expect(true).toBe(true)
})


// describe("Authentication - Sign Up", () => {
//   test("any field empty", async () => {
//     let fields = {
//       firstName: "hemant",
//       lastName: "vardani",
//       userName: "hemant11@H" + Math.round(Math.random() * 10000000),
//       password: "qwerty11@H",
//     };

//     for (let key of Object.keys(fields)) {
//       let fieldsTemp = fields;
//       fieldsTemp[key] = "";

//       console.log("Testing when payload is ", fieldsTemp);
//       try {
//         await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fieldsTemp);

//         failTheTest();
//       } catch (err) {
//         console.log(err.status, "response");
//         expect(err.response.status).toBe(400);
//       }
//     }

//     for (let key of Object.keys(fields)) {
//       let fieldsTemp = fields;
//       delete fieldsTemp[key];

//       console.log("Testing when payload is ", fieldsTemp);
//       try {
//         await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fieldsTemp);

//         failTheTest();
//       } catch (err) {
//         expect(err.response.status).toBe(400);
//       }
//     }
//   });

//   test("password not strong", async () => {
//     let fields = {
//       firstName: "hemant",
//       lastName: "vardani",
//       userName: "hemant@H" + Math.round(Math.random() * 10000000),
//       password: "qwerty",
//     };

//     try {
//       await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
//       failTheTest();
//     } catch (err) {
//       console.log(err.response.status, "response code");
//       expect(err.response.status).toBe(400);
//     }
//   });

//   test("All Favorable -user successfully able to sign up ", async () => {
//     let fields = {
//       firstName: "hemant",
//       lastName: "vardani",
//       userName: "hemant11@HF" + Math.round(Math.random() * 10000000),
//       password: "qwerty11@HF",
//     };

//     try {
//       let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
//       expect(res.status).toBe(200);
//       expect(res?.data?.data?.token).toBeDefined();
//     } catch (err) {
//       failTheTest();
//     }
//   });

//   test("user already exist", async () => {
//     let fields = {
//       firstName: "hemant",
//       lastName: "vardani",
//       userName: "hemant11@H" + Math.round(Math.random() * 10000000),
//       password: "qwerty11@H",
//     };

//     let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
//     expect(res.status).toBe(200);

//     try {
//       await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
//       failTheTest();
//     } catch (err) {
//       expect(err.status).toBe(409);
//     }
//   });
// });

// describe("Authentication - Sign In", () => {
//   test("Sign In- field blank ", async () => {
//     let res;
//     console.log("BACKEND_URL ::", BACKEND_URL);
//     try {
//       res = await axios.post(`http://localhost:3000/api/v1/user/signin`, {
//         userName: "sjlfjslkjls",
//       });

//       failTheTest();
//     } catch (err) {
//       expect(err.response.status).toBe(400);
//     }

//     try {
//       res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
//         password: "Hskldjflk@11",
//       });
//       failTheTest();
//     } catch (err) {
//       expect(err.response.status).toBe(400);
//     }
//   });

//   test("Sign In- user not exists ", async () => {
//     let fields = {
//       userName: "hemant11@H1" + Math.round(Math.random() * 10000000),
//       password: "qwerty11@H",
//     };

//     try {
//       res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, fields);
//       failTheTest();
//     } catch (err) {
//       expect(err.status).toBe(401);
//     }
//   });

//   test("Sign In- wrong password ", async () => {
//     let fields = {
//       firstName: "hemant",
//       lastName: "vardani",
//       userName: "hemant11@H1" + Math.round(Math.random() * 10000000),
//       password: "qwerty11@H",
//     };

//     let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);

//     delete fields.firstName;
//     delete fields.lastName;

//     fields.password = fields.password + "1";

//     try {
//       res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, fields);
//       failTheTest();
//     } catch (err) {
//       expect(err.status).toBe(401);
//     }
//   });

//   test("Sign In- All Favorable - correct password ", async () => {
//     let fields = {
//       firstName: "hemant",
//       lastName: "vardani",
//       userName: "hemant11@H1" + Math.round(Math.random() * 10000000),
//       password: "qwerty11@H",
//     };

//     let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);

//     delete fields.firstName;
//     delete fields.lastName;

//     fields.password = fields.password;

//     res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, fields);
//     expect(res.status).toBe(200);
//     expect(res.data.data.token).toBeDefined();
//   });
// });
