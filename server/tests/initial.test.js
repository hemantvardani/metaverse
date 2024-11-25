// before writing api -> writing test
// import { Axios } from "xios";
const {Axios} = require("axios");

test("h",()=>{
    expect(1==1).toBe(true);
    expect(1==2).toBe(true)}
)


// test("h",()=>{expect(1==1).toBe(true)})

const BACKEND_URL= process.env.BACKEND_BASE_URL;

describe("Authentication - Sign Up", ()=>{
    test("any field empty",async ()=>{
        let fields={
            firstName:"hemant",
            lastName:"vardani",
            userName:"hemant11@H"+ Math.round(Math.random()*10000000),
            password:"qwerty11@H"
        }

        for(let key of Object.keys(fields)){
            let fieldsTemp=fields;
            fieldsTemp[key]="";

            console.log("Testing when payload is ", fieldsTemp)
            let res= await Axios.post(`${BACKEND_URL}/api/v1/user/signup`,fieldsTemp);
            expect(res.status).toBe(400);
        }


        for(let key of Object.keys(fields)){
            let fieldsTemp=fields;
            delete fieldsTemp[key];

            console.log("Testing when payload is ", fieldsTemp)
            let res= await Axios.post(`${BACKEND_URL}/api/v1/user/signup`,fieldsTemp);
            expect(res.status).toBe(400);
        }

        
    })

    test("password not strong",async ()=>{

        let fields={
            firstName:"hemant",
            lastName:"vardani",
            userName:"hemant@H"+ Math.round(Math.random()*10000000),
            password:"qwerty"
        }

         let res= await Axios.post(`${BACKEND_URL}/api/v1/user/signup`,fieldsTemp);
         expect(res.status).toBe(400);
    })
   

    test(" All Favourable -user successfully able to sign up ",async ()=>{

        let fields={
            firstName:"hemant",
            lastName:"vardani",
            userName:"hemant11@HF"+ Math.round(Math.random()*10000000),
            password:"qwerty11@HF"
        }

         let res= await Axios.post(`${BACKEND_URL}/api/v1/user/signup`,fieldsTemp);
         expect(res.status).toBe(200);
    })


    test("user already exist",async ()=>{

        let fields={
            firstName:"hemant",
            lastName:"vardani",
            userName:"hemant11@H"+ Math.round(Math.random()*10000000),
            password:"qwerty11@H"
        }

         let res= await Axios.post(`${BACKEND_URL}/api/v1/user/signup`,fieldsTemp);
         expect(res.status).toBe(200);

          res= await Axios.post(`${BACKEND_URL}/api/v1/user/signup`,fieldsTemp);
          expect(res.status).toBe(409);
    })

    
})



describe("Authentication - Sign In", ()=>{

    test("Sign In- field blank ", async()=>{
    
        let res= await Axios.post(`${BACKEND_URL}/api/v1/user/signin`,{userName:"sjlfjslkjls"});
        expect(res.status).toBe(400);

        res= await Axios.post(`${BACKEND_URL}/api/v1/user/signin`,{password:"Hskldjflk@11"});
        expect(res.status).toBe(400);

    })

    test("Sign In- user not exists ", async()=>{

        let fields={   
            userName:"hemant11@H1"+ Math.round(Math.random()*10000000),
            password:"qwerty11@H"
        }     

         res= await Axios.post(`${BACKEND_URL}/api/v1/user/signin`,fields);
         expect(res.status).toBe(401);

    })

    test("Sign In- wrong password ", async()=>{

        let fields={
            firstName:"hemant",
            lastName:"vardani",
            userName:"hemant11@H1"+ Math.round(Math.random()*10000000),
            password:"qwerty11@H"
        }

        let res= await Axios.post(`${BACKEND_URL}/api/v1/user/signup`,fields);

         
        delete fields.firstName;
        delete fields.lastName;

        fields.password=fields.password+"1";
         res= await Axios.post(`${BACKEND_URL}/api/v1/user/signin`,fields);
         expect(res.status).toBe(401);

    })

    test("Sign In- All Favourable - correct password ", async()=>{

        let fields={
            firstName:"hemant",
            lastName:"vardani",
            userName:"hemant11@H1"+ Math.round(Math.random()*10000000),
            password:"qwerty11@H"
        }

        let res= await Axios.post(`${BACKEND_URL}/api/v1/user/signup`,fields);

         
        delete fields.firstName;
        delete fields.lastName;

        fields.password=fields.password;
        res= await Axios.post(`${BACKEND_URL}/api/v1/user/signin`,fields);
        expect(res.status).toBe(200);
        expect(res.response.token).toBeDefined();

    })
})


describe("User Create Avatar -> Get list of Avatars -> select a avator",()=>{
   let token;
  

   beforeAll("signUp and signIn user",async()=>{
    let fields={
        firstName:"hemant",
        lastName:"vardani",
        userName:"hemant11@H"+ Math.round(Math.random()*10000000),
        password:"qwerty11@H", 
        role:"ADMIN"
    }

    let res= await Axios.post(`${BACKEND_URL}/api/v1/user/signup`,fields);
    expect(res.status).toBe(200);

    delete fields.firstName;
    delete fields.lastName;
    res= await Axios.post(`${BACKEND_URL}/api/v1/user/signin`,fields);

    expect(res.status).toBe(200);
    expect(res.response).toHaveProperty('token');

    token=res.response.token;
   })

   test('create a avatar - fields empty',async()=>{
    let fields= {
        title:"hemant" + Math.round(Math.random()*1000),
        img:"url"
    }
    for(const key of Object.keys(fields)){
        const res= await Axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{...fields,[key]:""},{header:{'authorization':`Berear ${token}`}});
        expect(res.status).toBe(400);
    }
   })


   test('create a avatar - unauthorized',async ()=>{
    let fields= {
        title:"hemant" + Math.round(Math.random()*1000),
        img:"url"
    }
    const res= await Axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,fields);
        expect(res.status).toBe(401);
   })

  

   test('create a avatar - All Favaourable',async ()=>{
    let fields= {
        title:"hemant" + Math.round(Math.random()*1000),
        img:"url"
    }
    const res= await Axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,fields,{header:{'authorization':`Berear ${token}`}});
        expect(res.status).toBe(200);
    
    describe("get list of all avatar availabel ",()=>{
        let token;

        beforeAll("signUp and signIn user with Player role",async()=>{
            let fields={
                firstName:"hemant",
                lastName:"vardani",
                userName:"hemant11@H"+ Math.round(Math.random()*10000000),
                password:"qwerty11@H"
            }
        
            let res= await Axios.post(`${BACKEND_URL}/api/v1/user/signup`,fields);
            expect(res.status).toBe(200);
        
            delete fields.firstName;
            delete fields.lastName;
            res= await Axios.post(`${BACKEND_URL}/api/v1/user/signin`,fields);
        
            expect(res.status).toBe(200);
            expect(res.response).toHaveProperty('token');
        
            token=res.response.token;
           })

        test('get list of avatar available - unauthorized',async()=>{

            const res= await Axios.get(`${BACKEND_URL}/api/v1/element/all`);
            expect(res.status).toBe(401);
        })

        decribe('get list of avatar available - All Favarable', ()=>{
            let avatars;

            beforeAll("",async ()=>{
                const res= await Axios.get(`${BACKEND_URL}/api/v1/element/all`,{header:{'authorization':`Berear ${token}`}});
                expect(res.status).toBe(200);
                avatars= res.response.elements;
            })
            

            test("select a avatar-> bad request",async()=>{
                
                const res= await Axios.post(`${BACKEND_URL}/api/v1/user/update`,{avatarId:""},{header:{'authorization':`Berear ${token}`}});
                expect(res.status).toBe(400);
            })

            test("select a avatar-> authorized",async()=>{

                const avatarId= avatars[0].avatarId;
                const res= await Axios.post(`${BACKEND_URL}/api/v1/user/update`,{avatarId});
                expect(res.status).toBe(401);
            })

            test("select a avatar-> All Favourable",async()=>{
                const avatarId= avatars[0].avatarId;
                const res= await Axios.post(`${BACKEND_URL}/api/v1/user/update`, {avatarId}, {header:{'authorization':`Berear ${token}`}});
                expect(res.status).toBe(200);
            })

        })
    })
   })

   test('create a avatar - name already exists',async ()=>{
    let fields= {
        title:"hemant" + Math.round(Math.random()*1000),
        img:"url"
    }
    let res= await Axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,fields,{header:{'authorization':`Berear ${token}`}});
    expect(res.status).toBe(200);

    res= await Axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,fields,{header:{'authorization':`Berear ${token}`}});
    expect(res.status).toBe(409);

   })
})



