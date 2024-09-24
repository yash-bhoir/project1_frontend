import React, { useState } from 'react';

import './Admin.css';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import AddProduct from './ecommerce/AddProduct';
import ProductList from './ecommerce/ProductList';
import CategoryList from './category/CategoryList';
import NewCategory from './category/NewCategory';
import OrderList from './orders/OrderList';
import OrderDetails from './orders/OrderDetails';
import OrderTracking from './orders/OrderTracking';
import Bills from './bills/Bills';
import Users from './users/Users';
import Notification from './notification/Notification';
import MyAccount from './account/MyAccount';
import Exit from './exit/Exit';

const Admin: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<string>('Dashboard');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Add Product':
                return <AddProduct />;
            case 'Product List':
                return <ProductList />;
            case 'Category List':
                return <CategoryList />;
            case 'New Category':
                return <NewCategory />;
            case 'Order List':
                return <OrderList />;
            case 'Order Details':
                return <OrderDetails />;
            case 'Order Tracking':
                return <OrderTracking />;
            case 'Bills':
                return <Bills />;
            case 'Users':
                return <Users />;
            case 'Notifications':
                return <Notification />;
            case 'Account':
                return <MyAccount />;
            case 'Exit':
                return <Exit />;
            default:
                return <div>Select an option from the sidebar.</div>;
        }
    };

    return (
        <div className="page-container">
            <Sidebar setSelectedComponent={setSelectedComponent} />
            <div className="main-content">
                <Header />
                <div className="content">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
};

export default Admin;
