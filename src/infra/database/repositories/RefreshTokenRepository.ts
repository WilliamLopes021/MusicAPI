import { RefreshTokenModel } from "../models";
import { RefreshToken } from "../../../domain/entities";
import { RefreshTokenMapper } from "../mappers";
import { IRefreshTokenRepository } from "../../../domain/repositories";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  async save(data: RefreshToken): Promise<RefreshToken> {
    const document = RefreshTokenMapper.toDocument(data);

    const doc = await RefreshTokenModel.findByIdAndUpdate(
      data.id,
      document,
      { new: true, upsert: true },
    );

    return RefreshTokenMapper.toEntity(doc);
  }

  async delete(id: string): Promise<void> {
    await RefreshTokenModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<RefreshToken | null> {
    const doc = await RefreshTokenModel.findById(id);
    if (!doc) return null;

    return RefreshTokenMapper.toEntity(doc);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const doc = await RefreshTokenModel.findOne({ token: token });
    if (!doc) return null;

    return RefreshTokenMapper.toEntity(doc);
  }

  async deleteMany(obj: Partial<RefreshToken>): Promise<void> {
    await RefreshTokenModel.deleteMany(obj); 
  }
}
