
interface Controller {
  handle(): Promise<void>;
}

export class UserController implements Controller {
  async handle(): Promise<void> {
    console.log()
    throw new Error("Method not implemented.");
  }

}
