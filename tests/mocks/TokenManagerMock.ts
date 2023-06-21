import { USER_ROLES } from "../../src/models/User";

export interface TokenPayload {
  id: string;
  name: string;
  role: USER_ROLES;
}

export class TokenManagerMock {
  // converte o objeto de dados (payload) para um token string
  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      // signup de nova conta
      return "token-mock";
    } else if (payload.id === "id-mock-teste") {
      // login de teste (conta normal)
      return "token-mock-teste";
    } else {
      // login de teste2 (conta admin)
      return "token-mock-teste2";
    }
  };

  // valida e converte o token string para um objeto de dados (payload)
  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock-teste") {
      return {
        id: "id-mock-teste",
        name: "teste",
        role: USER_ROLES.NORMAL,
      };
    } else if (token === "token-mock-teste2") {
      return {
        id: "id-mock-teste2",
        name: "teste2",
        role: USER_ROLES.ADMIN,
      };
    } else {
      return null;
    }
  };
}
