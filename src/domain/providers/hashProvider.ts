export interface IHashProvider {
  hash(password: string): Promise<string>;
  comparePassword(plain: string, hash: string): Promise<Boolean>;
}
