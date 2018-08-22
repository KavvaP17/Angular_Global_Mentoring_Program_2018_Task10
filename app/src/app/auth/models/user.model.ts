  export class UserName {
      constructor(
          public first: string,
          public last: string
      ) {}
  }
  export class User {
      constructor(
          public id: number,
          public fakeToken: string,
          public name: UserName,
          public login: string,
          public password: string
      ) {}
  }
