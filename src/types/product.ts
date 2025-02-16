export interface Product {
    img: string;
    title: string;
    value: number;
    additionalText?: string;
    discount: boolean;
    percentage?: number; 
    installments: string;
    seller: string;
    class?: string; 
}