// before writing api -> writing test
// import 'dotenv/config';
require('dotenv').config()
const axios = require( 'axios')
// import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_BASE_URL;
console.log("BACKEND_URL",BACKEND_URL)

const failTheTest=()=>{
  expect(true).toBe(false)
}


describe("Authentication - Sign Up", () => {
  test("any field empty", async () => {
    let fields = {
      firstName: "hemant",
      lastName: "vardani",
      userName: "hemant11@H" + Math.round(Math.random() * 10000000),
      password: "qwerty11@H",
    };

    for (let key of Object.keys(fields)) {
      let fieldsTemp = fields;
      fieldsTemp[key] = "";

      console.log("Testing when payload is ", fieldsTemp);
      try{

        await axios.post(
          `${BACKEND_URL}/api/v1/user/signup`,
          fieldsTemp
        );

        failTheTest();
      }catch(err){

        console.log(  err.status,"response")
        expect(err.response.status).toBe(400);
         
      }
    
      
    }

    for (let key of Object.keys(fields)) {
      let fieldsTemp = fields;
      delete fieldsTemp[key];

      console.log("Testing when payload is ", fieldsTemp);
      try{
        await axios.post(
          `${BACKEND_URL}/api/v1/user/signup`,
          fieldsTemp
        );

        failTheTest();

      }catch(err){
        expect(err.response.status).toBe(400);
      }
       
    }
  });


  test("password not strong", async () => {
    let fields = {
      firstName: "hemant",
      lastName: "vardani",
      userName: "hemant@H" + Math.round(Math.random() * 10000000),
      password: "qwerty",
    };

    try {
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
      failTheTest();
    }catch(err){
      console.log( err.response.status,"response code")
      expect(err.response.status).toBe(400);
    }

  });

  test("All Favourable -user successfully able to sign up ", async () => {
    let fields = {
      firstName: "hemant",
      lastName: "vardani",
      userName: "hemant11@HF" + Math.round(Math.random() * 10000000),
      password: "qwerty11@HF",
    };

    try{
      let res= await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
      expect(res.status).toBe(200);
      expect(res?.data?.data?.token).toBeDefined();
    }catch(err){   
      failTheTest();
    } 
  });

  test("user already exist", async () => {
    let fields = {
      firstName: "hemant",
      lastName: "vardani",
      userName: "hemant11@H" + Math.round(Math.random() * 10000000),
      password: "qwerty11@H",
    };

    let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
    expect(res.status).toBe(200);

    try{
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields); 
      failTheTest();
    }catch(err){
      expect(err.status).toBe(409);
    } 

  });
});











describe("Authentication - Sign In", () => {
  test("Sign In- field blank ", async () => {

    let res ;
    console.log("BACKEND_URL ::",BACKEND_URL)
      try {
        res=  await axios.post(`http://localhost:3000/api/v1/user/signin`, {
          userName: "sjlfjslkjls"
        });
      
        failTheTest();
      }catch (err){
        expect(err.response.status).toBe(400)
      }
      

      try {
        res =  await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
          password: "Hskldjflk@11",
        });
        failTheTest();
      }catch (err){
         
        expect(err.response.status).toBe(400);
      }
      
     
  
  });

  test("Sign In- user not exists ", async () => {
    let fields = {
      userName: "hemant11@H1" + Math.round(Math.random() * 10000000),
      password: "qwerty11@H",
    };

    try{
      res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, fields);
      failTheTest();
    }catch(err){
      expect(err.status).toBe(401);
    }
  
  });

  test("Sign In- wrong password ", async () => {
    let fields = {
      firstName: "hemant",
      lastName: "vardani",
      userName: "hemant11@H1" + Math.round(Math.random() * 10000000),
      password: "qwerty11@H",
    };

    let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);

    delete fields.firstName;
    delete fields.lastName;

    fields.password = fields.password + "1";

    try{
      res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, fields);
      failTheTest();
    }catch(err){
      expect(err.status).toBe(401);
    }


  });

  test("Sign In- All Favourable - correct password ", async () => {
    let fields = {
      firstName: "hemant",
      lastName: "vardani",
      userName: "hemant11@H1" + Math.round(Math.random() * 10000000),
      password: "qwerty11@H",
    };

    let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);

    delete fields.firstName;
    delete fields.lastName;

    fields.password = fields.password;
    
    res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, fields);
    expect(res.status).toBe(200);
    expect(res.data.data.token).toBeDefined();
  });
});













// describe("User Create Avatar -> Get list of Avatars -> select a avator", () => {
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

//   test("create a avatar - All Favaourable", async () => {
//     let fields = {
//       title: "hemant" + Math.round(Math.random() * 1000),
//       img: "url",
//     };
//     const res = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, fields, {
//       header: { authorization: `bearer ${token}` },
//     });
//     expect(res.status).toBe(200);

//     describe("get list of all avatar availabel ", () => {
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










//       describe("get list of avatar available - All Favarable", () => {
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

//         test("select a avatar-> All Favourable", async () => {
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

//   test("create element- All Favourable", async () => {
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











// describe("Create Map with Admin", () => {
//   let adminToken;
//   let userToken;
//   let elementId1;
//   let elementId2;

//   beforeAll("signUp and signIn user and create a element", async () => {
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

//     const createElementPayload1 = {
//       title: "E" + Math.ceil(Math.random() * 100),
//       img: "sde",
//       width: 3,
//       height: 1,
//       static: true,
//     };

//     res = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       createElementPayload1,
//       { header: { authorization: `bearer ${adminToken}` } }
//     );
//     expect(res.status).toBe(200);
//     expect(res.response).toHaveProperty("id");
//     elementId1 = res.response.id;

//     const createElementPayload2 = {
//       title: "E" + Math.ceil(Math.random() * 100),
//       img: "sde",
//       width: 3,
//       height: 1,
//       static: true,
//     };

//     res = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       createElementPayload2,
//       { header: { authorization: `bearer ${adminToken}` } }
//     );
//     expect(res.status).toBe(200);
//     expect(res.response).toHaveProperty("id");
//     elementId2 = res.response.id;
//   });

//   test("create Map - Forbidden", async () => {
//     const createMapPayload = {
//       title: "M" + Math.ceil(Math.random() * 100),
//       img: "sde",
//       description: "xyz",
//       width: 100,
//       height: 100,
//       defaultElements: [
//         {
//           elementId1,
//           x: 10,
//           y: 11,
//         },
//         {
//           elementId2,
//           x: 15,
//           y: 18,
//         },
//         {
//           elementId1,
//           x: 18,
//           y: 30,
//         },
//       ],
//     };
//     let res = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       createMapPayload,
//       { header: { authorization: `bearer ${userToken}` } }
//     );
//     expect(res.status).toBe(403);
//   });

//   test("create Map- unauthorized", async () => {
//     const createMapPayload = {
//       title: "M" + Math.ceil(Math.random() * 100),
//       img: "sde",
//       description: "xyz",
//       width: 100,
//       height: 100,
//       defaultElements: [
//         {
//           elementId1,
//           x: 10,
//           y: 11,
//         },
//         {
//           elementId2,
//           x: 15,
//           y: 18,
//         },
//         {
//           elementId1,
//           x: 18,
//           y: 30,
//         },
//       ],
//     };
//     let res = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       createMapPayload,
//       { header: { authorization: `bearer ${adminToken}` } }
//     );
//     expect(res.status).toBe(401);
//   });

//   test("create Map- blank fields", async () => {
//     const createMapPayload = {
//       title: "M" + Math.ceil(Math.random() * 100),
//       img: "sde",
//       description: "xyz",
//       width: 100,
//       height: 100,
//       defaultElements: [
//         {
//           elementId1,
//           x: 10,
//           y: 11,
//         },
//         {
//           elementId2,
//           x: 15,
//           y: 18,
//         },
//         {
//           elementId1,
//           x: 18,
//           y: 30,
//         },
//       ],
//     };

//     Object.keys(createMapPayload).forEach(async (key) => {
//       let updatedPayload = { ...createMapPayload, [key]: "" };
//       let res = await axios.post(
//         `${BACKEND_URL}/api/v1/admin/map`,
//         updatedPayload,
//         { header: { authorization: `bearer ${adminToken}` } }
//       );
//       expect(res.status).toBe(400);
//     });
//   });

//   test("create Map- All Favourable", async () => {
//     const createMapPayload = {
//       title: "M" + Math.ceil(Math.random() * 100),
//       img: "sde",
//       description: "xyz",
//       width: 100,
//       height: 100,
//       defaultElements: [
//         {
//           elementId1,
//           x: 10,
//           y: 11,
//         },
//         {
//           elementId2,
//           x: 15,
//           y: 18,
//         },
//         {
//           elementId1,
//           x: 18,
//           y: 30,
//         },
//       ],
//     };

//     let res = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       createMapPayload,
//       { header: { authorization: `bearer ${adminToken}` } }
//     );
//     expect(res.status).toBe(200);
//     expect(res.response).toHaveProperty("id");
//   });
// });

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



// get space info
