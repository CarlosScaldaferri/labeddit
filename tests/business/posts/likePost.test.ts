import { PostBusiness } from "../../../src/business/PostBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { PostDataBaseMock, postsMock } from "../../mocks/PostDataBaseMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";

describe("Testando like e dislike no post", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve dar like no post corretamente", async () => {
    await postBusiness.likePost({
      id: "id-mock-post-astrodev",
      token: "token-mock-fulano",
      like: true,
    });

    expect(postsMock[1].likes).toEqual(55);
  });
});
