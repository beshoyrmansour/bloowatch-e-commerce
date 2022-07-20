import React from 'react'
import { IProduct } from '../Models'
import styles from '../styles/products.module.css'
import { useRouter } from 'next/router'

type Props = {
  product: IProduct
}

const ProductCard = (props: Props) => {
  const router = useRouter()

  const { product } = props
  return (
    <div key={product.id} className='col-12 col-md-6 col-lg-4'>
      <div className={styles.productInfo} onClick={() => router.push(`/products/${product.id}`)}>
        <div className={styles.product_image_wrapper}>
          {product.oldPrice && (<span className={styles.onsale}>Sale</span>)}
          <img src={product.image} alt={product.name} className={styles.product_image} />
        </div>
        <div className={styles.product_name}>{product.name}</div>
        <div className={styles.product_category}>
          {`${product.department}, ${product.adjective}`}
        </div>
        <div className={styles.product_price_wrapper}>
          <div className={styles.product_price}>{product.price}</div>
          {product.oldPrice && <div className={styles.product_oldPrice}>{product.oldPrice}</div>}
        </div>
      </div>
    </div>
  )
}

export default ProductCard