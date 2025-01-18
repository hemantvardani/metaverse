require("dotenv").config();
const axios = require("axios");

const BACKEND_URL = process.env.BACKEND_BASE_URL;
console.log("BACKEND_URL", BACKEND_URL);

const failTheTest = () => {
  expect(true).toBe(false);
};

// describe("Create Elements with Admin", () => {
//   let adminToken;
//   let userToken;

//   beforeAll("signUp and signIn user", async () => {
//     // sign up and sign in with admin

//     let fields = {
//       firstName: "hemant",
//       lastName: "vardani",
//       userName: "hemant11@H" + Math.round(Math.random() * 10000000),
//       password: "qwerty11@H",
//       role: "ADMIN",
//     };

//     let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
//     expect(res.status).toBe(200);

//     delete fields.firstName;
//     delete fields.lastName;
//     res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, fields);

//     expect(res.status).toBe(200);
//     expect(res.response).toHaveProperty("token");

//     adminToken = res.response.token;

//     fields = {
//       firstName: "hemant",
//       lastName: "vardani",
//       userName: "hemant11@H" + Math.round(Math.random() * 10000000),
//       password: "qwerty11@H",
//     };

//     res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
//     expect(res.status).toBe(200);

//     delete fields.firstName;
//     delete fields.lastName;
//     res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, fields);

//     expect(res.status).toBe(200);
//     expect(res.response).toHaveProperty("token");

//     userToken = res.response.token;
//   });

//   test("create element- Forbidden", async () => {
//     const createElementPayload = {
//       title: "E" + Math.ceil(Math.random() * 100),
//       img: "sde",
//       width: 3,
//       height: 1,
//       static: true,
//     };
//     let res = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       createElementPayload,
//       { header: { authorization: `bearer ${userToken}` } }
//     );
//     expect(res.status).toBe(403);
//   });

//   test("create element- unauthorized", async () => {
//     const createElementPayload = {
//       title: "E" + Math.ceil(Math.random() * 100),
//       img: "sde",
//       width: 3,
//       height: 1,
//       static: true,
//     };
//     let res = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       createElementPayload,
//       { header: { authorization: `bearer ${adminToken}` } }
//     );
//     expect(res.status).toBe(401);
//   });

//   test("create element- blank fields", async () => {
//     const createElementPayload = {
//       title: "E" + Math.ceil(Math.random() * 100),
//       img: "sde",
//       width: 3,
//       height: 1,
//       static: true,
//     };

//     Object.keys(createElementPayload).forEach(async (key) => {
//       let updatedPayload = { ...createElementPayload, [key]: "" };
//       let res = await axios.post(
//         `${BACKEND_URL}/api/v1/admin/element`,
//         updatedPayload,
//         { header: { authorization: `bearer ${adminToken}` } }
//       );
//       expect(res.status).toBe(400);
//     });
//   });

//   test("create element- All Favorable", async () => {
//     const createElementPayload = {
//       title: "E" + Math.ceil(Math.random() * 100),
//       img: "sde",
//       width: 3,
//       height: 1,
//       static: true,
//     };

//     let res = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       createElementPayload,
//       { header: { authorization: `bearer ${adminToken}` } }
//     );
//     expect(res.status).toBe(200);
//     expect(res.response).toHaveProperty("id");
//   });
// });
