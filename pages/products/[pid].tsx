import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router'
import ProductImageGallery from '../../components/ProductImageGallery';
import { IProduct, IReview } from '../../Models';
import { BaseURL, EndPoints } from '../api/EndPoints';
import styles from '../../styles/products.module.css'
import ProductQuantityControls from '../../components/ProductQuantityControls';

const ProductDetails: NextPage<{ product: IProduct }> = (props) => {
  const { product } = props;

  const router = useRouter()
  const { pid, ...params } = router.query;
  const [quantity, setQuantity] = useState(1)
  const addNewItemToCart: (product: IProduct) => void = (product) => {
    fetch(`${BaseURL}${EndPoints.cart}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product, quantity })
    }).then(data => {
      if (data.status === 200) {
        router.push('/cart')
      }
    }).catch(err => {
      console.log({ err });
    }
    )
  }

  const updateCartItemQuantity: (product: IProduct, newQuantity: number) => void = (product, newQuantity) => {
    fetch(`${BaseURL}${EndPoints.cart}/${pid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: newQuantity })
    }).then(data => {
      if (data.status === 200) {
        router.push('/cart')
      }
    }).catch(err => {
      if (err) {
        addNewItemToCart(product)
      }
    })
  }

  const handleAddToCart = () => {
    fetch(`${BaseURL}${EndPoints.cart}/${pid}`).then(data => {
      if (data.status === 200) {
        return data.json();
      }
    }).catch(err => {
      if (err) {
        addNewItemToCart(product)
      }
    }).then(data => {
      console.log({ data });
      if (data && data.quantity > 0) {
        updateCartItemQuantity(product, data?.quantity + quantity)
      } else {
        addNewItemToCart(product)
      }
    })
  }
  return <div className='container'>
    <div className="row">
      <div className="col-12 col-md-12 col-lg-7 col-xl-7">
        <ProductImageGallery images={product.images} />
      </div>
      <div className="col-12 col-md-12 col-lg-5 col-xl-5">
        <h3 >{product.name}</h3>
        <div className={`${styles.product_price_wrapper} justify-content-start mt-4`}>
          <div className={`${styles.product_price} me-3`}>{product.price}</div>
          {product.oldPrice && <div className={styles.product_oldPrice}>
            {product.oldPrice}</div>}
        </div>
        <p className='mt-4'>{product.description}</p>
        <div className='d-flex justify-content-center align-items-center'>
          <ProductQuantityControls quantity={quantity} onChange={setQuantity} />
          <button className='ms-3 btn btn-outline-dark rounded-0' onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
    <p>id: {product.id}</p>
    <p>createdAt: {product.createdAt}</p>
    <p>image: {product.image}</p>
    <p>oldPrice: {product.oldPrice}</p>
    <p>price: {product.price}</p>
    <p>department: {product.department}</p>
    <p>product: {product.product}</p>
    <p>material: {product.material}</p>
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
      pageName: data.name
    }
  }
}

export default ProductDetails