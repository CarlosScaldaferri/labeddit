import { PostBusiness } from "../../../src/business/PostBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { PostDataBaseMock } from "../../mocks/PostDataBaseMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";

describe("Testando createPosts", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve criar post corretamente", async () => {
    const output = await postBusiness.createPost({
      content: "Novo Post",
      token: "token-mock-teste",
    });

    expect(output).toEqual("Post criado com sucesso");
  });
});
