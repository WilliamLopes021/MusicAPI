import Base from "./Base.js";
import Refresh from "../models/RefreshToken.js";

class RefreshRepository extends Base {
  constructor() {
    super(Refresh);
  }

  async updateTime(filter, time = "7d") {
    const updatedToken = await Refresh.updateOne(filter, { expiresAt: time });
    return updatedToken;
  }
}

export default new RefreshRepository();
