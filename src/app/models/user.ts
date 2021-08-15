export class User {
  id: number | undefined;
  email: String | undefined;
  firstName: String | undefined;
  lastName: String | undefined;

  constructor(
    id?: number,
    email?: String,
    firstName?: String,
    lastName?: String
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  initWithJSON(json): User {
    for (var key in json) {
      this[key] = json[key];
    }
    return this;
  }
}
