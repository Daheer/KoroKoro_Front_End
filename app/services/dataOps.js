export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { supabase } from './supabaseClient'

export async function getProducts() {

  let { data: products, error } = await supabase
    .from('products')
    .select('*')
  const formattedProducts = products.map(product => ({
    id: product.id,
    name: product.title,
    price: product.price,
    category: product.category,
    image: product.image_link,
    status: product.status,
    unique_id: product.unique_id,
  }));

  return formattedProducts;
}

export async function getProductByID(id) {
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('unique_id', id)

  const formattedProduct = {
    id: product[0].id,
    name: product[0].title,
    price: product[0].price,
    category: product[0].category,
    image: product[0].image_link,
    status: product[0].status,
    unique_id: product[0].unique_id,
  };

  return formattedProduct;

}