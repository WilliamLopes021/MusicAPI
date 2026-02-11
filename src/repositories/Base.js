class Base {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    if (!data || typeof data !== "object") return;
    const result = await this.model.create(data);
    return result;
  }

  async index() {
    const result = await this.model.find();
    return result;
  }

  async show(filter) {
    const result = await this.model.findOne(filter);
    return result;
  }

  async update(filter, data) {
    const updated = await this.model.findOneAndUpdate(filter, data, {
      new: true,
    });
    return updated;
  }

  async destroy(filter) {
    const deleted = await this.model.findOneAndDelete(filter);
    return deleted;
  }

}

export default Base;
