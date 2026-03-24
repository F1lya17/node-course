import { Container } from "inversify";
import type { IConfigService } from "../config/config-servive.interface.js";
import { FILE_TYPES } from "../file-types.js";
import type { IUsersService } from "./users-service.interface.js";
import { UsersService } from "./users-service.js";
import type { IUserRepository } from "./users-repository.interface.js";
import type { UserEntity } from "./user.entity.js";
import type { UserModel } from "../generated/prisma/index.js";

const ConfigServiceMock: IConfigService = {
  get: jest.fn().mockName("get"),
};

const UserRepositoryMock: IUserRepository = {
  create: jest.fn().mockName("create"),
  find: jest.fn().mockName("find"),
};

const mockUserData = {
  email: "user@gmail.com",
  name: "user",
  password: "123",
};

const container = new Container();
let configService: IConfigService;
let userService: IUsersService;
let userRepository: IUserRepository;

beforeAll(() => {
  container.bind<IUsersService>(FILE_TYPES.IUsersService).to(UsersService);
  container.bind<IConfigService>(FILE_TYPES.IConfigService).toConstantValue(ConfigServiceMock);
  container.bind<IUserRepository>(FILE_TYPES.IUserRepository).toConstantValue(UserRepositoryMock);

  configService = container.get<IConfigService>(FILE_TYPES.IConfigService);
  userService = container.get<IUsersService>(FILE_TYPES.IUsersService);
  userRepository = container.get<IUserRepository>(FILE_TYPES.IUserRepository);
});

describe("User Service", () => {
  it("createUser", async () => {
    configService.get = jest.fn().mockReturnValueOnce("1");
    userRepository.create = jest.fn().mockImplementationOnce(
      (user: UserEntity): UserModel => ({
        id: 1,
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    );

    const createdUser = await userService.createUser(mockUserData);

    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.password).not.toEqual(mockUserData.password);
  });

  it("validateUser", async () => {
    // todo: разделить данный тест на 3 отдельных
    configService.get = jest.fn().mockReturnValueOnce("1");
    userRepository.create = jest.fn().mockImplementationOnce(
      (user: UserEntity): UserModel => ({
        id: 1,
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    );

    const createdUser = await userService.createUser(mockUserData);

    userRepository.find = jest.fn().mockImplementation((email: string): UserModel | null => {
      return email === mockUserData.email ? createdUser : null;
    });

    const validUser = await userService.validateUser({
      email: mockUserData.email,
      password: mockUserData.password,
    });
    const invalidUser = await userService.validateUser({
      email: mockUserData.email,
      password: "1234",
    });
    const nonExistedUser = await userService.validateUser({
      email: "nonExistedUser@gmail.com",
      password: "1234",
    });
    expect(validUser).toBeTruthy();
    expect(invalidUser).toBeFalsy();
    expect(nonExistedUser).toBeFalsy();
  });
});
