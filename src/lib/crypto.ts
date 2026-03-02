'use strict';
import { hash, verify } from '@node-rs/argon2';

async function hashPassword(password: string): Promise<string> {
  return hash(password, {
    algorithm: 2, // argon2id
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
  });
}

async function verifyPassword(
  hashedPassword: string,
  password: string,
): Promise<boolean> {
  return verify(hashedPassword, password);
}

export { hashPassword, verifyPassword };
