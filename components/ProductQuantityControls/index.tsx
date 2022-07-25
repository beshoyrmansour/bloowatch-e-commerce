import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from './ProductQuantityControls.module.css'

type Props = {
  quantity: number;
  onChange: (quantity: number) => void;
  minValue?: number;
}

const ProductQuantityControls = (props: Props) => {
  const { quantity, onChange, minValue = 0 } = props;
  const handleIncrease: () => void = () => {
    onChange(quantity + 1)
  }
  const handleDecrease: () => void = () => {
    onChange(quantity - 1 < 0 ? 0 : quantity - 1)
  }
  return (
    <span className='d-flex justify-content-center align-items-center'>
      <p className='px-2 m-0 lead'>{quantity}</p>
      <div className="d-flex justify-content-center align-items-center flex-column w-100">
        <button className={styles.button} onClick={handleIncrease} >
          <FontAwesomeIcon
            icon={faAngleUp}
            style={{ fontSize: 20 }}
          />
        </button>
        <button className={styles.button} onClick={handleDecrease} disabled={quantity <= minValue}>
          <FontAwesomeIcon
            icon={faAngleDown}

            style={{ fontSize: 20 }}
          />
        </button>
      </div>
    </span>
  )
}

export default ProductQuantityControls;