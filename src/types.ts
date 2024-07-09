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

export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    // 필요한 다른 상태들 추가
}


export interface OrderModuleDTO {
    id: number;
    price: number;
    storeName: string;
    email: string;
    address: string;
    status: PaymentStatus;
    paymentUid: string;
    orderUid: string;
}

export interface PaymentResponse {
    response: {
        status: string;
        amount: number;
    };
}
