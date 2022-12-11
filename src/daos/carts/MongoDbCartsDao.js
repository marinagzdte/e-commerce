import MongoDbContainer from '../../containers/MongoDbContainer.js';
import CartSchema from '../../schemas/Cart.js';

class MongoDbCartsDao extends MongoDbContainer {
    constructor() {
        super('carts', CartSchema);
    }

    save() {
        const newCart = { timestamp: new Date(), products: [] }
        return super.save(newCart)
    }
}

export default MongoDbCartsDao;