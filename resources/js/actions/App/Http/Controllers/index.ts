import ProductController from './ProductController'
import EventController from './EventController'
import DashboardController from './DashboardController'
import Admin from './Admin'
import Settings from './Settings'
const Controllers = {
    ProductController: Object.assign(ProductController, ProductController),
EventController: Object.assign(EventController, EventController),
DashboardController: Object.assign(DashboardController, DashboardController),
Admin: Object.assign(Admin, Admin),
Settings: Object.assign(Settings, Settings),
}

export default Controllers