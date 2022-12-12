import MongoDbContainer from '../../containers/MongoDbContainer.js';
import { CartSchema } from '../../schemas/Cart.js';

class MongoDbCartsDao extends MongoDbContainer {
    constructor() {
        super('carts', CartSchema);
    }
}

export default MongoDbCartsDao;