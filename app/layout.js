import NavBar from "./components/NavBar"
import CircleStdFont from "next/font/local"
import { getProducts } from './services/dataOps';
import { getObjFileParts } from './services/downloadOps';
import { prepareObjFile } from './components/ProductCard';

export const CircleStdFontStyle = CircleStdFont({ src: '../font/CircularStd-Book.ttf' })

async function fetchProduct() {
  const products = await getProducts();
  return products;
}

export const metadata = {
  title: 'KoroKoro',
  description: 'A novel way to view items for sale!',
  icons: {
    icon: '/view.png',
  },
  creator: 'Dahiru Ibrahim',
}


export default async function RootLayout({ children }) {
  const products = await fetchProduct();
  for (const product of products) {
    if (product.status !== 'DONE') continue;
    const unique_id = product.unique_id;
    const obj_file_parts = await getObjFileParts(unique_id);
    await prepareObjFile(unique_id, obj_file_parts);
  }
  return (
    <html lang="en">
      <body className={CircleStdFontStyle.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
