export type User = { id: string } & ProtoUser;

export type ProtoUser = {
  email: string;
  password: string;
  name: string;
  familyName: string;
  Friends: User[];
  Enemies: User[];
};
