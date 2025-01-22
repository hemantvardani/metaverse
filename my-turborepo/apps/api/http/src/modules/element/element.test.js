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

describe("Create Elements with Admin -> Get list of all Elements", () => {
  let adminToken;
  let userToken;

  // sign up and make it admin
  beforeAll( async () => {
    // sign up and sign in with admin

    let fields = {
      firstName: "hemant",
      lastName: "vardani",
      userName: "hemant11@H" + Math.round(Math.random() * 10000000),
      password: "qwerty11@H"
    };

    let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
    expect(res.status).toBe(200);
    expect(res.data.data).toHaveProperty("token")
    adminToken= res.data.data.token;

    res= await axios.patch(`${BACKEND_URL}/api/v1/user`, {role:'ADMIN'}, { headers: { authorization: `Bearer ${adminToken}` } });

    expect(res.status).toBe(200);

     

    fields = {
      firstName: "hemant",
      lastName: "vardani",
      userName: "hemant11@H" + Math.round(Math.random() * 10000000),
      password: "qwerty11@H",
    };

    res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
    expect(res.status).toBe(200);
    expect(res.data.data).toHaveProperty("token")
    userToken= res.data.data.token;

  });

  test("create element- Forbidden", async () => {
    let createElementPayload = {
      title: "E" + Math.ceil(Math.random() * 100),
      img: "sde",
      width: 3,
      height: 1
    };
    let res;
    try{
      
      res = await axios.post(
        `${BACKEND_URL}/api/v1/design/element`,
        createElementPayload,
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      failTheTest();

    }catch(err){
      expect(err.response.status).toBe(403);
    }

    try{ 
      res = await axios.post(
        `${BACKEND_URL}/api/v1/design/element`,
        {...createElementPayload,overridable: true,},
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      failTheTest();

    }catch(err){
      expect(err.response.status).toBe(403);
    }
    
     

  });

  test("create element- unauthorized", async () => {
    const createElementPayload = {
      title: "E" + Math.ceil(Math.random() * 100),
      img: "sde",
      width: 3,
      height: 1
    };
    
    let res;
    try{ 
      res = await axios.post(
        `${BACKEND_URL}/api/v1/design/element`,
        createElementPayload
      );
      failTheTest();

    }catch(err){
      expect(err.response.status).toBe(401);
    }


    
    try{ 
      res = await axios.post(
        `${BACKEND_URL}/api/v1/design/element`,
        {...createElementPayload,overridable: true,},
      );
      failTheTest();

    }catch(err){
      expect(err.response.status).toBe(401);
    }


  

  });

  test("create element- blank fields", async () => {
    let createElementPayload = {
      title: "E" + Math.ceil(Math.random() * 100),
      img: "sde",
      width: 3,
      height: 1
    };

    Object.keys(createElementPayload).forEach(async (key) => {
      let updatedPayload = { ...createElementPayload, [key]: "" };
      let res;
      try{ 
        res = await axios.post(
          `${BACKEND_URL}/api/v1/design/element`,
          updatedPayload,
          { headers: { authorization: `Bearer ${adminToken}` } }
        );
        failTheTest();
  
      }catch(err){
        expect(err.response.status).toBe(400);
      }

    });

    Object.keys(createElementPayload).forEach(async (key) => {
      let updatedPayload = createElementPayload;
      delete updatedPayload[key];

      let res;

      try{ 
        res = await axios.post(
          `${BACKEND_URL}/api/v1/design/element`,
          updatedPayload,
          { headers: { authorization: `Bearer ${adminToken}` } }
        );
        failTheTest();
  
      }catch(err){
        expect(err.response.status).toBe(400);
      }


    });


    createElementPayload = {
      title: "E" + Math.ceil(Math.random() * 100),
      img: "sde",
      width: 3,
      height: 1,
      overridable: true,
    };

    Object.keys(createElementPayload).forEach(async (key) => {
      let updatedPayload = { ...createElementPayload, [key]: "" };
      try{ 
        res = await axios.post(
          `${BACKEND_URL}/api/v1/design/element`,
          updatedPayload,
          { headers: { authorization: `Bearer ${adminToken}` } }
        );
        failTheTest();
  
      }catch(err){
        expect(err.response.status).toBe(400);
      }


    });

    Object.keys(createElementPayload).forEach(async (key) => {
      let updatedPayload = createElementPayload;
      delete updatedPayload[key];


      try{ 
        res = await axios.post(
          `${BACKEND_URL}/api/v1/design/element`,
          updatedPayload,
          { headers: { authorization: `Bearer ${adminToken}` } }
        );
        failTheTest();
  
      }catch(err){
        expect(err.response.status).toBe(400);
      }

    });

  });

  describe("create element- All Favorable -> get all elements",() => {
    let elementId1, elementId2;
    beforeAll(async()=>{
      let createElementPayload = {
        title: "E" + Math.ceil(Math.random() * 100),
        img: "sde",
        width: 3,
        height: 1
      };
  
      let res = await axios.post(
        `${BACKEND_URL}/api/v1/design/element`,
        createElementPayload,
        { headers: { authorization: `Bearer ${adminToken}` } }
      );
      expect(res.status).toBe(200);
      expect(res.data.data).toHaveProperty("elementId");
      elementId1= res.data.data.elementId;
  
  
  
      createElementPayload = {
        title: "E" + Math.ceil(Math.random() * 100),
        img: "sde",
        width: 3,
        height: 1,
        overridable:true
      };
  
      res = await axios.post(
        `${BACKEND_URL}/api/v1/design/element`,
        createElementPayload,
        { headers: { authorization: `Bearer ${adminToken}` } }
      );
      expect(res.status).toBe(200);
      expect(res.data.data).toHaveProperty("elementId");
      elementId2= res.data.data.elementId;

      console.log("elementiddd", elementId1,elementId2)
    })

    test("get list of all available elements - unauthorize", async()=>{
      let res;
      try{
        res = await axios.get(
          `${BACKEND_URL}/api/v1/element`
        );

        failTheTest();
      }catch(err){
        expect(err.response.status).toBe(401);
      }
    })

    test("get list of all available elements - all favorable", async()=>{
 
        let res = await axios.get(
          `${BACKEND_URL}/api/v1/element`,
          { headers: { authorization: `Bearer ${userToken}` } }
        );
        expect(res.status).toBe(200);

        console.log("available elements are",  res.data.data.elements);


        expect(res.data.data.elements.some(element=>String(element.uuid)==String(elementId1))).toBe(true);
        expect(res.data.data.elements.some(element=>String(element.uuid)==String(elementId2))).toBe(true);

    })

  });
});
