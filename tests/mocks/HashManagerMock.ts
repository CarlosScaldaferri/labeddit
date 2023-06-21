export class HashManagerMock {
  public hash = async (): Promise<string> => {
    return "hash-mock";
  };

  public compare = async (
    plaintext: string,
    hash: string
  ): Promise<boolean> => {
    switch (plaintext) {
      case "teste123":
        return hash === "hash-mock-teste";
      case "teste299":
        return hash === "hash-mock-teste2";
      default:
        return false;
    }
  };
}
