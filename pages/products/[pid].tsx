import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router'
import { IProduct, IReview } from '../../Models';
import { BaseURL, EndPoints } from '../api/EndPoints';

const ProductDetails: NextPage<{ product: IProduct }> = (props) => {
  const { product } = props;

  const router = useRouter()
  const { pid, ...params } = router.query

  return <div>
    <p>id: {product.id}</p>
    <p>createdAt: {product.createdAt}</p>
    <p>name: {product.name}</p>
    <p>image: {product.image}</p>
    <p>oldPrice: {product.oldPrice}</p>
    <p>price: {product.price}</p>
    <p>department: {product.department}</p>
    <p>product: {product.product}</p>
    <p>material: {product.material}</p>
    <p>description: {product.description}</p>
    <p>adjective: {product.adjective}</p>
    <p>color: {product.color}</p>
    <p>tags: {product.tags}</p>
    <p>reiews: {product.reiews?.map((review: IReview) => (<p key={review.createdAt}>review:{review.review}</p>))}</p>
    <p>relatedProducts: {product.relatedProducts}</p>
  </div>
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {


  const res = await fetch(`${BaseURL}${EndPoints.products}/${params?.pid}`)
  const data = await res.json()

  return {
    props: {
      product: data,
    }
  }
}

export default ProductDetails