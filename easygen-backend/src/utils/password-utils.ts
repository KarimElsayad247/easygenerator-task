import * as bcrypt from 'bcrypt';

export const hashed = async (password: string): Promise<string> => {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
};

export const match = async (
  plaintext: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(plaintext, hash);
};
