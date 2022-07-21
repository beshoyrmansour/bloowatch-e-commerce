import React, { useState } from 'react'

type Props = { images: string[] }

const ProductImageGallery = (props: Props) => {
  const { images } = props
  const [selectedImage, setSelectedImage] = useState(images[0])
  return (
    <div>ProductImageGallery</div>
  )
}

export default ProductImageGallery