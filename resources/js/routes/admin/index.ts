import products from './products'
import events from './events'
import productCategories from './product-categories'
import users from './users'
const admin = {
    products: Object.assign(products, products),
events: Object.assign(events, events),
productCategories: Object.assign(productCategories, productCategories),
users: Object.assign(users, users),
}

export default admin