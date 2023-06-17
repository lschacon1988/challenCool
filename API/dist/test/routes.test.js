"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const Users_manger_1 = __importDefault(require("../utils/manager/Users.manger"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const usersManager = new Users_manger_1.default();
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Cerrar la conexión a la base de datos
    yield mongoose_1.default.disconnect();
}));
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
    it("test_get_all_users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/users");
        expect(response.status).toBe(200);
    }));
    it("test array_get_users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/users");
        expect(response.body).toEqual(expect.arrayContaining([]));
    }));
    // Tests that a user is successfully created and returned with status 201.
    it("test_sign_up_successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockReq = {
            body: {
                username: "testuser",
                email: "testuser@example.com",
                password: "testpassword"
            }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const expectedUser = {
            _id: expect.any(mongoose_1.default.Types.ObjectId),
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
        yield (0, auth_controllers_1.signUp)(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(201);
    }));
});
