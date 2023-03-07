/* eslint-disable no-unused-vars */
import { User, ProtoUser } from "../models/user";

type apiResponse = {
  result: User[];
};

export interface UserApiRepoStructure {
  loadUsers(token: string): Promise<User[]>;
  createOrLoginUser(user: ProtoUser, type: string): Promise<User>;
  // TEMPO:
  // updateUser(user: ProtoUser): Promise<User>;
  // getUser(id: User["id"]): Promise<User>;
}

export class UserApiRepo implements UserApiRepoStructure {
  url: string;

  constructor() {
    this.url = "URL";
  }

  async loadUsers(token: string): Promise<User[]> {
    const resp = await fetch(this.url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!resp.ok) throw new Error("Error: " + resp.status + resp.statusText);

    const data = (await resp.json()) as apiResponse;

    return data.result as User[];
  }

  async createOrLoginUser(user: ProtoUser, type: string): Promise<User> {
    const url = this.url + "/" + type;

    const resp = await fetch(url, {
      method: "POST",
    });

    if (!resp.ok) throw new Error("Error: " + resp.status + resp.statusText);

    const data = (await resp.json()) as apiResponse;

    return data.result[0] as User;
  }
}
