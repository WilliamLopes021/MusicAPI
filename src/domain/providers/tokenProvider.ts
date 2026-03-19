export interface ITokenProvider {
  signToken(payload: unknown, type: string, expires: number): string;
  generateRawToken(): string;
}
