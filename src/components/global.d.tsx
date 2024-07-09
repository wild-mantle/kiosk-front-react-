export {};

interface Iamport {
    init: (merchantCode: string) => void;
    request_pay: (params: any, callback: (response: any) => void) => void;
}

declare global {
    interface Window {
        IMP?: Iamport;
    }
}
