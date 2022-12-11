import MongoDbContainer from '../../containers/MongoDbContainer.js';
import { OrderSchema } from '../../schemas/Order.js';

class MongoDbOrdersDao extends MongoDbContainer {
    constructor() {
        super('orders', OrderSchema);
    }
}

export default MongoDbOrdersDao;