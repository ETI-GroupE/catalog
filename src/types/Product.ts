export type Product = {
    product_id: number;
    owner_id: number;
    product_name: string;
    product_image_url: string;
    product_description: string;
    product_price: number;
    product_category_id: number;
    product_ship_location: string;
    product_status: 'ACTIVE' | 'INACTIVE';
    product_original_stock: number;
    product_stock: number;
}