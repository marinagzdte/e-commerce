export class CartDto {
    constructor({ _id, address, products, timestamp }) {
        this.id = _id;
        this.address = address;
        this.products = products;
        this.timestamp = timestamp;
    }
}

export const asDto = (cart) => {
    if (!cart) return
    if (Array.isArray(cart))
        return cart.map(c => new CartDto(c))
    else
        return new CartDto(cart)
}