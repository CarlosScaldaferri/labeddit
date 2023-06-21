import { USER_ROLES, UserDB } from "../../src/models/User";
import { BaseDataBase } from "../../src/database/BaseDataBase";

export const usersMock: UserDB[] = [
  {
    id: "id-mock-teste",
    name: "teste",
    email: "teste@email.com",
    password: "hash-mock-teste", // senha = "teste123"
    role: USER_ROLES.NORMAL,
    created_at: new Date().toISOString(),
  },
  {
    id: "id-mock-teste2",
    name: "teste2",
    email: "teste2@email.com",
    password: "hash-mock-teste2", // senha = "teste299"
    role: USER_ROLES.ADMIN,
    created_at: new Date().toISOString(),
  },
];

export class UserDatabaseMock extends BaseDataBase {
  public static TABLE_USERS = "users";

  public getUsers = async () => {
    return usersMock;
  };

  public signUp = async (newUserDB: UserDB) => {
    usersMock.push(newUserDB);
  };

  public findUSerByEmail = async (email: string): Promise<UserDB> => {
    const [userDB]: UserDB[] = usersMock.filter((user) => user.email === email);

    return userDB;
  };
}
