import fs from "fs";
import { resolve } from "path";
import { promisify } from "util";
import { file_path, file_extension } from "@/passwords.config";
import { enc, SHA256, AES } from "crypto-js";

const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

export const handleAuthentication = async (email, password) => {
  try {
    const fileName = SHA256(email + password).toString(enc.Hex);
    const filePath = file_path;
    const fileExtension = file_extension;
    const fileNameWithExtension = `${fileName}.${fileExtension}`;
    const fullPath = resolve(filePath, fileNameWithExtension);

    const isFileExists = await exists(fullPath);

    if (isFileExists) {
      const fileContent = await readFile(fullPath, "utf8");

      const decryptedContent = AES.decrypt(fileContent, email + password).toString(enc.Utf8);

      const parsedContent = JSON.parse(decryptedContent);

      return parsedContent;
    } else {
      await mkdir(filePath, { recursive: true });

      const encryptedContent = AES.encrypt(JSON.stringify([]), email + password).toString();

      await writeFile(fullPath, encryptedContent);

      const fileContent = await readFile(fullPath, "utf8");

      const decryptedContent = AES.decrypt(fileContent, email + password).toString(enc.Utf8);

      const parsedContent = JSON.parse(decryptedContent);

      return parsedContent;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

