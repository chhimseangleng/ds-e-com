import ProductController from './ProductController'
import EventController from './EventController'
import ProductCategoryController from './ProductCategoryController'
import UserController from './UserController'
const Admin = {
    ProductController: Object.assign(ProductController, ProductController),
EventController: Object.assign(EventController, EventController),
ProductCategoryController: Object.assign(ProductCategoryController, ProductCategoryController),
UserController: Object.assign(UserController, UserController),
}

export default Admin