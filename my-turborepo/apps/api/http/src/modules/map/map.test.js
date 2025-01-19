require("dotenv").config();
const axios = require("axios");

const BACKEND_URL = process.env.BACKEND_BASE_URL;
console.log("BACKEND_URL", BACKEND_URL);

const failTheTest = () => {
  expect(true).toBe(false);
};

test("identity test", ()=>{
  expect(true).toBe(true)
})

// describe("Create Map with Admin", () => {
//     let adminToken;
//     let userToken;
//     let elementId1;
//     let elementId2;

//     beforeAll("signUp and signIn user and create a element", async () => {
//       // sign up and sign in with admin

//       let fields = {
//         firstName: "hemant",
//         lastName: "vardani",
//         userName: "hemant11@H" + Math.round(Math.random() * 10000000),
//         password: "qwerty11@H",
//         role: "ADMIN",
//       };

//       let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
//       expect(res.status).toBe(200);

//       delete fields.firstName;
//       delete fields.lastName;
//       res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, fields);

//       expect(res.status).toBe(200);
//       expect(res.response).toHaveProperty("token");

//       adminToken = res.response.token;

//       fields = {
//         firstName: "hemant",
//         lastName: "vardani",
//         userName: "hemant11@H" + Math.round(Math.random() * 10000000),
//         password: "qwerty11@H",
//       };

//       res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
//       expect(res.status).toBe(200);

//       delete fields.firstName;
//       delete fields.lastName;
//       res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, fields);

//       expect(res.status).toBe(200);
//       expect(res.response).toHaveProperty("token");

//       userToken = res.response.token;

//       const createElementPayload1 = {
//         title: "E" + Math.ceil(Math.random() * 100),
//         img: "sde",
//         width: 3,
//         height: 1,
//         static: true,
//       };

//       res = await axios.post(
//         `${BACKEND_URL}/api/v1/admin/element`,
//         createElementPayload1,
//         { header: { authorization: `bearer ${adminToken}` } }
//       );
//       expect(res.status).toBe(200);
//       expect(res.response).toHaveProperty("id");
//       elementId1 = res.response.id;

//       const createElementPayload2 = {
//         title: "E" + Math.ceil(Math.random() * 100),
//         img: "sde",
//         width: 3,
//         height: 1,
//         static: true,
//       };

//       res = await axios.post(
//         `${BACKEND_URL}/api/v1/admin/element`,
//         createElementPayload2,
//         { header: { authorization: `bearer ${adminToken}` } }
//       );
//       expect(res.status).toBe(200);
//       expect(res.response).toHaveProperty("id");
//       elementId2 = res.response.id;
//     });

//     test("create Map - Forbidden", async () => {
//       const createMapPayload = {
//         title: "M" + Math.ceil(Math.random() * 100),
//         img: "sde",
//         description: "xyz",
//         width: 100,
//         height: 100,
//         defaultElements: [
//           {
//             elementId1,
//             x: 10,
//             y: 11,
//           },
//           {
//             elementId2,
//             x: 15,
//             y: 18,
//           },
//           {
//             elementId1,
//             x: 18,
//             y: 30,
//           },
//         ],
//       };
//       let res = await axios.post(
//         `${BACKEND_URL}/api/v1/admin/map`,
//         createMapPayload,
//         { header: { authorization: `bearer ${userToken}` } }
//       );
//       expect(res.status).toBe(403);
//     });

//     test("create Map- unauthorized", async () => {
//       const createMapPayload = {
//         title: "M" + Math.ceil(Math.random() * 100),
//         img: "sde",
//         description: "xyz",
//         width: 100,
//         height: 100,
//         defaultElements: [
//           {
//             elementId1,
//             x: 10,
//             y: 11,
//           },
//           {
//             elementId2,
//             x: 15,
//             y: 18,
//           },
//           {
//             elementId1,
//             x: 18,
//             y: 30,
//           },
//         ],
//       };
//       let res = await axios.post(
//         `${BACKEND_URL}/api/v1/admin/map`,
//         createMapPayload,
//         { header: { authorization: `bearer ${adminToken}` } }
//       );
//       expect(res.status).toBe(401);
//     });

//     test("create Map- blank fields", async () => {
//       const createMapPayload = {
//         title: "M" + Math.ceil(Math.random() * 100),
//         img: "sde",
//         description: "xyz",
//         width: 100,
//         height: 100,
//         defaultElements: [
//           {
//             elementId1,
//             x: 10,
//             y: 11,
//           },
//           {
//             elementId2,
//             x: 15,
//             y: 18,
//           },
//           {
//             elementId1,
//             x: 18,
//             y: 30,
//           },
//         ],
//       };

//       Object.keys(createMapPayload).forEach(async (key) => {
//         let updatedPayload = { ...createMapPayload, [key]: "" };
//         let res = await axios.post(
//           `${BACKEND_URL}/api/v1/admin/map`,
//           updatedPayload,
//           { header: { authorization: `bearer ${adminToken}` } }
//         );
//         expect(res.status).toBe(400);
//       });
//     });

//     test("create Map- All Favorable", async () => {
//       const createMapPayload = {
//         title: "M" + Math.ceil(Math.random() * 100),
//         img: "sde",
//         description: "xyz",
//         width: 100,
//         height: 100,
//         defaultElements: [
//           {
//             elementId1,
//             x: 10,
//             y: 11,
//           },
//           {
//             elementId2,
//             x: 15,
//             y: 18,
//           },
//           {
//             elementId1,
//             x: 18,
//             y: 30,
//           },
//         ],
//       };

//       let res = await axios.post(
//         `${BACKEND_URL}/api/v1/admin/map`,
//         createMapPayload,
//         { header: { authorization: `bearer ${adminToken}` } }
//       );
//       expect(res.status).toBe(200);
//       expect(res.response).toHaveProperty("id");
//     });
//   });
