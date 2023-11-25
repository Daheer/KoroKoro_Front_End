// import { getProducts } from 'app/services/dataOps';
import { supabase } from 'app/services/supabaseClient';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    async function getProducts() {

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
    async function getObjFileParts(id) {
      const { data, error } = await supabase
        .storage
        .from('korokoro_bucket')
        .list(id)
      if (error) {
        throw error;
      }
      const obj_file_parts = data.map(file => file.name);
      return obj_file_parts;
    }

    async function downloadFile(id, filename) {
      const { data, error } = await supabase
        .storage
        .from('korokoro_bucket')
        .download(`${id}/${filename}`)
      if (error) {
        throw error;
      }
      return data.text();
    }

    async function saveObj(id, blob) {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join('./public', `${id}`, 'mesh.obj');
      if (!fs.existsSync(`public/${id}`)) {
        fs.mkdirSync(`public/${id}`, { recursive: true });
      }
      try {
        fs.writeFileSync(filePath, await blob.text())
      } catch (error) {
        console.log(error)
      }
    }
    async function prepareObjFile(unique_id, obj_file_parts) {
      const fs = require('fs');
      if (fs.existsSync(`public/${unique_id}/mesh.obj`) && fs.statSync(`public/${unique_id}/mesh.obj`).size > 0) {
        return `/${unique_id}/mesh.obj`;
      }
      else {
        const total_data = []
        for (const part of obj_file_parts) {
          const data = await downloadFile(unique_id, part);
          if (data) {
            total_data.push(data)
            total_data.push('\n')
          }
        }
        const obj_blob = new Blob(total_data, { type: 'text/plain' });
        saveObj(unique_id, obj_blob);
        return `/${unique_id}/mesh.obj`;
      }
    }
    async function fetchProduct() {
      const products = await getProducts();
      return products;
    }

    async function prepareModels() {
      const products = await fetchProduct();

      for (const product of products) {
        if (product.status !== 'DONE') continue;
        const unique_id = product.unique_id;
        const obj_file_parts = await getObjFileParts(unique_id);
        const obj_file = await prepareObjFile(unique_id, obj_file_parts);
      }
    }

    await prepareModels();
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // await import('./instrumentation-edge')
    console.log('edge')
  }
}