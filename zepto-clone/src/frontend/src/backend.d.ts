import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ProductId = bigint;
export interface Product {
    id: ProductId;
    weight: string;
    inStock: boolean;
    originalPrice: bigint;
    subcategory: string;
    name: string;
    tags: Array<string>;
    discountLabel: string;
    imageUrl: string;
    discount: bigint;
    category: string;
    brand: string;
    rating: number;
    price: bigint;
    reviewCount: bigint;
}
export interface backendInterface {
    getBestsellers(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
}
