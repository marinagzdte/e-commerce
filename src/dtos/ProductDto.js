export class ProductDto {
    constructor({ _id, description, category, thumbnail, price }) {
        this.id = _id;
        this.description = description;
        this.category = category;
        this.thumbnail = thumbnail;
        this.price = price;
    }
}

export const asDto = (prod) => {
    if (!prod) return
    if (Array.isArray(prod))
        return prod.map(p => new ProductDto(p))
    else
        return new ProductDto(prod)
}