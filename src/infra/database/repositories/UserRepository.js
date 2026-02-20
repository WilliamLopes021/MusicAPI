import Base from "./Base.js";
import User from "../domain/entities/User.js";

class UserRepository extends Base {
  constructor() {
    super(User);
  }
}

export default new UserRepository();
