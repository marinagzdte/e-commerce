export class OrderDto {
    constructor({ _id, number, items, timestamp, status, email }) {
        this.id = _id;
        this.number = number;
        this.items = items;
        this.timestamp = timestamp;
        this.status = status;
        this.email = email;
    }
}

export const asDto = (user) => {
    if (!user) return
    if (Array.isArray(user))
        return user.map(u => new OrderDto(u))
    else
        return new OrderDto(user)
}