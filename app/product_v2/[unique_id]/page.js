import ProductCard from "../../components/ProductCard";

export default function ProductPage({ params }) {
  const unique_id = params.unique_id
  return (
    <div>
      <ProductCard unique_id={unique_id} />
    </div>
  );
}