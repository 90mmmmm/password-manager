import fs from "fs/promises";
import path from "path";
import { file_path, file_extension } from "./passwords.config";
import { SHA256 } from "crypto-js";
import AES from "crypto-js/aes";
import encUTF8 from "crypto-js/enc-utf8";

export const savePasswords = async (newPasswords, email, password) => {
  try {
    const fileName = SHA256(email + password).toString();
    const filePath = file_path;
    const fileExtension = file_extension;

    const fileNameWithExtension = `${fileName}.${fileExtension}`;
    const fullPath = path.join(filePath, fileNameWithExtension);

    const encryptedContent = AES.encrypt(
      JSON.stringify(newPasswords),
      email + password
    ).toString();

    await fs.writeFile(fullPath, encryptedContent);

    const fileContent = await fs.readFile(fullPath, "utf8");

    const decryptedContent = AES.decrypt(
      fileContent,
      email + password
    ).toString(encUTF8);

    const parsedContent = JSON.parse(decryptedContent);

    return parsedContent;
  } catch (error) {
    console.log(error);
    return null;
  }
};
