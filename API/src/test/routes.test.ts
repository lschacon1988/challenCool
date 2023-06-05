import app from "../app";
import mongoose from "mongoose";


import request from "supertest";
import { getAllUsers } from "../controllers/users.controllers";
import UsersManager from "../utils/manager/Users.manger";
import User, { IUser } from "../models/User";
import { signUp } from "../controllers/auth.controllers";

const usersManager: any = new UsersManager();
afterAll(async () => {
  // Cerrar la conexión a la base de datos
  await mongoose.disconnect();
});

 
//   describe("UsersManager", () => {
//      // Tests that the getAll method returns an array of IUser objects.
//      it("test_get_all_returns_array_of_iuser_objects", async () => {
//       const mockUser = {
//           username: "testuser",
//           email: "testuser@test.com",
//           password: "testpassword",
//           isProvider: false,
//           touristicDestinations:[],
//           profile: null,
//           comparePassword: jest.fn(),
//           createdAt: new Date(),
//           updatedAt: new Date()
//       };
//       jest.spyOn(User, "find").mockResolvedValueOnce([mockUser]);
//       const usersManager = new UsersManager();
//       const result = await usersManager.getAll();
//       expect(result).toEqual([mockUser]);
//   });

//   // Tests that the getAll method returns an array of IUser objects.
//   it("test_get_all_returns_array_of_iuser_objects", async () => {
//     const mockUser = {
//         username: "testuser",
//         email: " testuser@test.com",
//         password: "testpassword",
//         isProvider: false,
//         touristicDestinations: [],
//         profile: null,
//         comparePassword: jest.fn(),
//         createdAt: new Date(),
//         updatedAt: new Date()
//     };
//     jest.spyOn(User, "find").mockResolvedValueOnce([mockUser]);
//     const usersManager = new UsersManager();
//     const result = await usersManager.getAll();
//     expect(result).toEqual([mockUser]);
// });

//     // Tests that the create method returns an IUser object when given a valid user object.
//     it("test_create_returns_iuser_object_when_given_valid_user_object", async () => {
//       const mockUser: IUser | any = {
//           username: "testuser",
//           email: "testuser@test.com",
//           password: "testpassword",
//           isProvider: false,
//           touristicDestinations: [],
//           profile: null,
//           comparePassword: jest.fn(),
//           createdAt: new Date(),
//           updatedAt: new Date()
//       };
//       jest.spyOn(User, "findOne").mockResolvedValueOnce(null);
//       jest.spyOn(User, "create").mockResolvedValueOnce(mockUser);
//       const usersManager = new UsersManager();
//       const result = await usersManager.create(mockUser);
//       expect(result).toEqual(mockUser);
//   });

//   });



  describe("routes users", () => {
    it("test_get_all_users", async () => {
      const response = await request(app).get("/api/users");
      expect(response.status).toBe(200);
    });

    it("test array_get_users", async () => {
      const response = await request(app).get("/api/users");
      expect(response.body).toEqual(expect.arrayContaining([]));
    });
    
         // Tests that a user is successfully created and returned with status 201.
    it("test_sign_up_successfully", async () => {
      const mockReq:any = {
          body: {
              username: "testuser",
              email: "testuser@example.com",
              password: "testpassword"
          }
      };
      const mockRes:any = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
      };
     
      const expectedUser: IUser | any= {
        _id: expect.any(mongoose.Types.ObjectId), // 
        username: "testuser",
        email: "testuser@example.com",
        password: expect.any(''),
        isProvider: false,
        touristicDestinations: [],
        profile: null,        
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    };
      
      
      jest.spyOn(usersManager, "create").mockResolvedValue(expectedUser);
      await signUp(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(201);
      
      
      

  });
  })
  
;

     

  

