import { PostBusiness } from "../../../src/business/PostBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { PostDataBaseMock, postsMock } from "../../mocks/PostDataBaseMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";

describe("Testando editPosts", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve editar post corretamente", async () => {
    await postBusiness.editPost({
      id: "id-mock-post-fulano",
      token: "token-mock-fulano",
      content: "Post editado",
    });

    const updatedPosts = await postBusiness.getPosts({
      token: "token-mock-fulano",
    });

    expect(updatedPosts).toEqual([
      {
        id: "id-mock-post-fulano",
        creatorId: "id-mock-fulano",
        content: "Post editado",
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
