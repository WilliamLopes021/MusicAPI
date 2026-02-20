import Base from "./Base.js";
import Verification from "../models/Verification.js";

class VerificationRepository extends Base {
  constructor() {
    super(Verification);
  }
}

export default new VerificationRepository();
