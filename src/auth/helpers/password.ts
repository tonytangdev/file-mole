import * as argon2 from 'argon2';

export async function getHashedPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

export async function isSamePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (error) {
    console.error(error);
    return false;
  }
}
