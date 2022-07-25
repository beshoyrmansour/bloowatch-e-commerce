import React, { useState } from 'react'

type Props = { images: string[] }

const ProductImageGallery = (props: Props) => {
  const { images } = props
  const [selectedImage, setSelectedImage] = useState(images[0])
  return (
    <div>
      <div className='row'>
        {images.map((image) => (
          <div className='col-6 col-md-3' key={image}>
            <img src={image} alt={image} className='img-fluid' onClick={() => setSelectedImage(image)} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default ProductImageGallery