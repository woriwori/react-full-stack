// package.json에서 type: module을 추가하지않으면 require 문법을 사용해야한다.
import fs from "fs"; // nodejs에 있는 file system
import { resolve } from "path";

const basePath = resolve(); // 현재 위치
const filenames = {
  messages: resolve(basePath, "src/db/messages.json"),
  users: resolve(basePath, "src/db/users.json"),
};

export const readDB = (target) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], "utf-8"));
  } catch (e) {
    console.error(e);
  }
};

export const writeDB = (target, data) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};
