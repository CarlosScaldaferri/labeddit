import { UserBusiness } from "../../../src/business/UserBusiness";
import { LogInSchema } from "../../../src/dtos/users/LogInDTO";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../../mocks/UserDataBaseMock";

describe("Testando log in", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("Deve retornar token ao fazer log in", async () => {
    const input = LogInSchema.parse({
      email: "teste@email.com",
      password: "teste123",
    });

    const output = await userBusiness.logIn(input);

    expect(output).toEqual("token-mock-teste");
  });
});
