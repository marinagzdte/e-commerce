import MongoDbContainer from '../../containers/MongoDbContainer.js';
import { ProductSchema } from '../../schemas/Product.js';

class MongoDbProductsDao extends MongoDbContainer {
    constructor() {
        super('products', ProductSchema);
    }
}

export default MongoDbProductsDao;