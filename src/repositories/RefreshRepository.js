import Base from "./Base.js";
import Refresh from "../models/RefreshToken.js";

class RefreshRepository extends Base {
  constructor() {
    super(Refresh);
  }

  async updateTime(filter, time = "7d") {
    const updatedToken = await this.model.updateOne(filter, {
      expiresAt: time,
    });
    return updatedToken;
  }

  async populateUser(id, ...fields) {
    const refreshToken = await this.model
      .findOne({
        user: id,
      })
      .populate("user", fields.join(" "));
    return refreshToken;
  }
}

export default new RefreshRepository();
