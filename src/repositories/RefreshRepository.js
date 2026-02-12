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

  async populateUser(id, fields) {
    const refreshToken = await Refresh.findOne({
      user: id,
    }).populate("user", fields);
    return refreshToken;
  }
}

export default new RefreshRepository();
