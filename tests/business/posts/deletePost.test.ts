import { PostBusiness } from "../../../src/business/PostBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { PostDataBaseMock, postsMock } from "../../mocks/PostDataBaseMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";

describe("Testando deletePost", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve deletar post corretamente", async () => {
    await postBusiness.deletePost({
      id: "id-mock-post-teste",
      token: "token-mock-teste",
    });

    expect(postsMock).toHaveLength(1);
  });
});
