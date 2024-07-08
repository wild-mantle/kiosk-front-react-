export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    options: CustomOption[];
}

export interface CustomOption {
    id: number;
    name: string;
    additionalPrice: number;
}