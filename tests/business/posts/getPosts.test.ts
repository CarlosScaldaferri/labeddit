import { PostBusiness } from "../../../src/business/PostBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { PostDataBaseMock } from "../../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";

describe("Testando getPosts", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve retornar posts corretamente", async () => {
    const postsMockModel = await postBusiness.getPosts({
      token: "token-mock-fulano",
    });

    expect(postsMockModel).toEqual([
      {
        id: "id-mock-post-fulano",
        creatorId: "id-mock-fulano",
        content: "Bananinha",
        likes: 23,
        dislikes: 12,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: "id-mock-post-astrodev",
        creatorId: "id-mock-astrodev",
        content: "Pepino",
        likes: 54,
        dislikes: 3,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });
});
