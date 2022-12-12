export class UserDto {
    constructor({ firstName, lastName, address, phoneNumber, email, cart, password }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.cart = cart;
        this.password = password;
    }
}

export const asDto = (user) => {
    if (!user) return
    if (Array.isArray(user))
        return user.map(u => new UserDto(u))
    else
        return new UserDto(user)
}