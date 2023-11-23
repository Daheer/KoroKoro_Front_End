import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import { getProducts } from '../services/dataOps';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchProduct() {
  const products = await getProducts();
  return products;
}

export default async function ProductsPage() {
  const products = await fetchProduct();
  return (
    <div style={{ background: 'rgba(0, 0, 0, 0)', marginTop: '2rem' }}>
      <Grid container spacing={4} sx={{ marginLeft: 10, marginRight: 10 }}>
        {
          products?.map(product => (
            <Product key={product.id} product={product} />
          ))
        }
      </Grid>
    </div >
  )
}

function Product({ product }) {
  const { id, name, category, price, image, status, unique_id } = product && {};
  return (
    <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
      <Card sx={{
        maxWidth: 280,
        padding: '1rem',
        borderRadius: '2rem',
        transition: 'box-shadow 0.5s',
        '&:hover': {
          boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.5);'
        },
      }}>
        <Link href={`product_v2/${product.unique_id}`} style={{ textDecoration: 'none' }}>
          <CardMedia
            component="img"
            height="240"
            width="100"
            alt={product.name}
            image={product.image}
            sx={{
              borderRadius: '1.2rem',
              transition: 'transform 0.5s',
              '&:hover': {
                transform: 'scale(1.2)',
                borderRadius: '1.4rem 1.4rem 0 0',
              },
            }}
          />
          <CardContent>
            <br />
            <p style={{ textDecoration: 'none', color: 'black', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', opacity: 0.7 }}> {product.category.toUpperCase()} </p>
            <p style={{ textDecoration: 'none', color: 'black', fontSize: '1.5rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', }}> {product.name.toUpperCase()} </p>
            <p style={{ textDecoration: 'none', color: 'black', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', opacity: 0.7 }}> ₦{product.price.toLocaleString('en-US')} </p>
          </CardContent>
        </Link>
      </Card>
    </Grid >
  )

}