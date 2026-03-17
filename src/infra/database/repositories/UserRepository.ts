import { UserModel } from "../models";
import { User } from "../../../domain/entities";
import { UserMapper } from "../mappers";
import { IUserRepository } from "../../../domain/repositories";

export class UserRepository implements IUserRepository {
  async save(data: User): Promise<User> {
    const document = UserMapper.toDocument(data);

    const doc = await UserModel.findByIdAndUpdate(
      data.id.getValue(),
      document,
      { new: true, upsert: true },
    );

    return UserMapper.toEntity(doc);
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    if (!doc) return null;

    return UserMapper.toEntity(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({email: email});
    if (!doc) return null;

    return UserMapper.toEntity(doc);
  }
}
