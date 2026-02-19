import { flagTypes } from "../models/Post.js";

const validationRules = {
  title: (v) => {
    const type = typeof v === "string";
    const len = v.trim().length > 0 && v.trim().length < 50;
    if (!type || !len) return false;
    return true;
  },
  description: (v) => {
    const type = typeof v === "string";
    if (!type) return false;
    return true;
  },
  creatorName: (v) => typeof v === "string" && v.trim() !== "",
  flags: (entries) => {
    let confirm;
    const arr = entries.trim().split(" ");
    arr.forEach((v) => {
      confirm = flagTypes.includes(v);
    });

    return confirm;
  },
};

export default validationRules;
