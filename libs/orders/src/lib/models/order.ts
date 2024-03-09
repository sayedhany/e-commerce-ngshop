import { User } from '@cairo/users';
import { OrderItem } from './order-item';
export class Order {
    id?: string;
    orderItems?: OrderItem[];
    shoppingAddres1?: string;
    shoppingAddres2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: string;
    totalPrice?: string;
    user?: User;
    dateOrdered?: string;
}
