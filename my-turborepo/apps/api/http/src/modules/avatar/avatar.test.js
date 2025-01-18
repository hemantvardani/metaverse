// before writing api -> writing test

require("dotenv").config();
const axios = require("axios");

const BACKEND_URL = process.env.BACKEND_BASE_URL;
console.log("BACKEND_URL", BACKEND_URL);

const failTheTest = () => {
  expect(true).toBe(false);
};

// describe("User Create Avatar -> Get list of Avatars -> select a avatar", () => {
//   let token;

//   beforeAll("signUp and signIn user", async () => {
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

//     token = res.response.token;
//   });

//   test("create a avatar - fields empty", async () => {
//     let fields = {
//       title: "hemant" + Math.round(Math.random() * 1000),
//       img: "url",
//     };
//     for (const key of Object.keys(fields)) {
//       const res = await axios.post(
//         `${BACKEND_URL}/api/v1/admin/avatar`,
//         { ...fields, [key]: "" },
//         { header: { authorization: `bearer ${token}` } }
//       );
//       expect(res.status).toBe(400);
//     }
//   });

//   test("create a avatar - unauthorized", async () => {
//     let fields = {
//       title: "hemant" + Math.round(Math.random() * 1000),
//       img: "url",
//     };
//     const res = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, fields);
//     expect(res.status).toBe(401);
//   });

//   test("create a avatar - All Favorable", async () => {
//     let fields = {
//       title: "hemant" + Math.round(Math.random() * 1000),
//       img: "url",
//     };
//     const res = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, fields, {
//       headers: { authorization: `bearer ${token}` },
//     });
//     expect(res.status).toBe(200);

//     describe("get list of all avatar available ", () => {
//       let token;

//       beforeAll("signUp and signIn user with Player role", async () => {
//         let fields = {
//           firstName: "hemant",
//           lastName: "vardani",
//           userName: "hemant11@H" + Math.round(Math.random() * 10000000),
//           password: "qwerty11@H",
//         };

//         let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
//         expect(res.status).toBe(200);

//         delete fields.firstName;
//         delete fields.lastName;
//         res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, fields);

//         expect(res.status).toBe(200);
//         expect(res.response).toHaveProperty("token");

//         token = res.response.token;
//       });

//       test("get list of avatar available - unauthorized", async () => {
//         const res = await axios.get(`${BACKEND_URL}/api/v1/element/all`);
//         expect(res.status).toBe(401);
//       });

//       describe("get list of avatar available - All Favorable", () => {
//         let avatars;

//         beforeAll("", async () => {
//           const res = await axios.get(`${BACKEND_URL}/api/v1/element/all`, {
//             header: { authorization: `bearer ${token}` },
//           });
//           expect(res.status).toBe(200);
//           avatars = res.response.elements;
//         });

//         test("select a avatar-> bad request", async () => {
//           const res = await axios.post(
//             `${BACKEND_URL}/api/v1/user/update`,
//             { avatarId: "" },
//             { header: { authorization: `bearer ${token}` } }
//           );
//           expect(res.status).toBe(400);
//         });

//         test("select a avatar-> authorized", async () => {
//           const avatarId = avatars[0].avatarId;
//           const res = await axios.post(`${BACKEND_URL}/api/v1/user/update`, {
//             avatarId,
//           });
//           expect(res.status).toBe(401);
//         });

//         test("select a avatar-> All Favorable", async () => {
//           const avatarId = avatars[0].avatarId;
//           const res = await axios.post(
//             `${BACKEND_URL}/api/v1/user/update`,
//             { avatarId },
//             { header: { authorization: `bearer ${token}` } }
//           );
//           expect(res.status).toBe(200);
//         });
//       });
//     });
//   });

//   test("create a avatar - name already exists", async () => {
//     let fields = {
//       title: "hemant" + Math.round(Math.random() * 1000),
//       img: "url",
//     };
//     let res = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, fields, {
//       header: { authorization: `bearer ${token}` },
//     });
//     expect(res.status).toBe(200);

//     res = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, fields, {
//       header: { authorization: `bearer ${token}` },
//     });
//     expect(res.status).toBe(409);
//   });
// });
