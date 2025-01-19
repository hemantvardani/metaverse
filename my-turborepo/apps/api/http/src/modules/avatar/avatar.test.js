// before writing api -> writing test

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

describe("User Create Avatar -> Get list of Avatars -> select a avatar", () => {
  let token;

  // "signUp and make it admin"
  beforeAll( async () => {
    let fields = {
      firstName: "hemant",
      lastName: "vardani",
      userName: "hemant11@H" + Math.round(Math.random() * 10000000),
      password: "qwerty11@H"
    };

    let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
    expect(res.status).toBe(200);
    expect(res.data.data).toHaveProperty("token")

    token= res.data.data.token;
    
    res= await axios.patch(`${BACKEND_URL}/api/v1/user`, {role:'ADMIN'}, { headers: { authorization: `Bearer ${token}` } });

    expect(res.status).toBe(200);
  });

  test("create a avatar - fields empty", async () => {
    let fields = {
      title: "hemant" + Math.round(Math.random() * 1000),
      img: "url",
    };
    for (const key of Object.keys(fields)) {
      let res;
      try{
        const temp={ ...fields, [key]: "" }
        console.log(temp,"temp")
        res = await axios.post(
          `${BACKEND_URL}/api/v1/design/avatar`,
          temp,
          { headers: { authorization: `Bearer ${token}` } }
        );

        failTheTest();
      }catch(err){
        expect(err.status).toBe(400);
      }
    }
  });

  test("create a avatar - unauthorized", async () => {
    let fields = {
      title: "hemant" + Math.round(Math.random() * 1000),
      img: "url",
    };
    let res
    try{
      res = await axios.post(`${BACKEND_URL}/api/v1/design/avatar`, fields);
      failTheTest();
    }catch(err){
      expect(err.status).toBe(401);
    }

  });

  describe("create a avatar - All Favorable",  () => {

    beforeAll(async()=>{

      let fields = {
        title: "hemant" + Math.round(Math.random() * 1000),
        img: "url",
      };
      const res = await axios.post(`${BACKEND_URL}/api/v1/design/avatar`, fields, {
        headers: { authorization: `Bearer ${token}` },
      });
      expect(res.status).toBe(200);
      expect(res.data.data).toHaveProperty("uuid")
    })

    describe("get list of all avatars available ", () => {
      let token;

      // "signUp and signIn user with Player role",
      beforeAll( async () => {
        let fields = {
          firstName: "hemant",
          lastName: "vardani",
          userName: "hemant11@H" + Math.round(Math.random() * 10000000),
          password: "qwerty11@H",
        };

        let res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, fields);
        expect(res.status).toBe(200);
        expect(res.data.data).toHaveProperty("token")

        token = res.data.data.token; 

      });

      test("get list of avatar available - unauthorized", async () => {

        try{
          const res = await axios.get(`${BACKEND_URL}/api/v1/avatar/`);
          failTheTest();
        }catch(err){
          expect(err.response.status).toBe(401);
        }

      });

      describe("get list of avatar available - All Favorable", () => {
        let avatars;

        beforeAll( async () => {
          const res = await axios.get(`${BACKEND_URL}/api/v1/avatar/`, {
            headers: { authorization: `Bearer ${token}` },
          });
          expect(res.status).toBe(200);
          avatars = res.data.data.avatars;
        });

        test("select a avatar-> bad request", async () => {
          
          let res;
          try{
            res = await axios.patch(
              `${BACKEND_URL}/api/v1/user/`,
              { avatarId: "" },
              { headers: { authorization: `Bearer ${token}` } }
            );
            failTheTest();
          }catch(err){
            expect(err.response.status).toBe(400);
          }


          try{
            res = await axios.patch(
              `${BACKEND_URL}/api/v1/user/`,
              { avatarId: "fsdkj83kfj93nfso" },
              { headers: { authorization: `Bearer ${token}` } }
            );
            failTheTest();
          }catch(err){
            expect(err.response.status).toBe(400);
          }


        });

        test("select a avatar-> authorized", async () => {
          const avatarId = avatars[0].uuid;
          let res;
          try{
            res = await axios.patch(`${BACKEND_URL}/api/v1/user/`, {
              avatarId,
            });
            failTheTest();
          }catch(err){
            expect(err.response.status).toBe(401);
          }
        });

        test("select a avatar-> All Favorable", async () => {
          const avatarId = avatars[0].uuid;
        
            let res = await axios.patch(
              `${BACKEND_URL}/api/v1/user/`,
              { avatarId },
              { headers: { authorization: `Bearer ${token}` } }
            );
            expect(res.status).toBe(200);

            res = await axios.get(
              `${BACKEND_URL}/api/v1/user/`,
              { headers: { authorization: `Bearer ${token}` } }
            );

            expect(res.status).toBe(200);
            console.log("res.data.data",res.data)
            expect(res.data.data.avatarId).toBe(avatarId);

        });
      });
    });
  });

});
