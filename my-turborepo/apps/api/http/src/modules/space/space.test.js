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


// describe("create a Space", () => {
//   let adminToken;
//   let userToken;
//   let elementId1;
//   let elementId2;
//   let mapId;
//   let availableMaps;

//   beforeAll(
//     "beforeAll : signup, signin as admin and player, create element and map as admin",
//     async () => {
//       // sign up, in as user admin
//       // create element and map as admin
//       // sing up, sign in , in as Player

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

//       res = await axios.post(
//         `${BACKEND_URL}/api/v1/admin/map`,
//         createMapPayload,
//         { header: { authorization: `bearer ${adminToken}` } }
//       );
//       expect(res.status).toBe(200);
//       expect(res.response).toHaveProperty("id");
//       mapId = res.response.id;

//       res = await axios.get(
//         `${BACKEND_URL}/api/v1/map`
//       );

//       expect(res.status).toBe(200);
//       expect(Array.isArray(res.response.maps)).toBe(true);

//       availableMaps=res.response;

//     }
//   );

//   test("Create a space -> check if space is created or not ", async()=>{
//     let createdSpaceId;

//     beforeAll("create a space", async ()=>{
//       let createSpacePayload={mapId};

//       res = await axios.post(
//         `${BACKEND_URL}/api/v1/space/create`,
//         createSpacePayload,
//         { header: { authorization: `bearer ${userToken}` } }
//       );

//       expect(res.status).toBe(200);
//       expect(res.response).toHaveProperty('spaceId')
//       createdSpaceId=res.response.spaceId;
//     })

//     test("get list of spaces and check", async ()=>{

//       let res = await axios.get(
//         `${BACKEND_URL}/api/v1/space`
//       );

//       expect(res.status).toBe(200);
//       expect(Array.isArray(res.response.spaces)).toBe(true);
//       expect((res.response.spaces).some(space=>space.id=spaceId)).toBe(true);

//       // also check - delete the space
//     })

//   })
// });
