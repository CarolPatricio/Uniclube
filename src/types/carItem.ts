export interface CartItem {
    title: string;
    img: string;
    value: number;
    oldPrice?: number;
    availability?: string;
    quantity: number;
    description?: string; 
    category: string; 
    shippingCost: string;
    deliveryDate: string;
  }
  