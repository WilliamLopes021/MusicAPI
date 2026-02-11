import { flagTypes } from "../models/Post.js";

const validationRules = {
  title: (v) => {
    const type = typeof v === "string";
    const len = v.trim().length > 0 && v.trim().length < 50;
    if (!type || !len) return false;
  },
  description: (v) => {
    const type = typeof v === "string";
    const len = v.trim().length >= 0 && v.trim().length < 255;
    if (!type || !len) return false;
  },
  creatorName: (v) => typeof v === "string" && v.trim() !== "",
  flags: (v) => flagTypes.includes(v),
};

export default validationRules;
