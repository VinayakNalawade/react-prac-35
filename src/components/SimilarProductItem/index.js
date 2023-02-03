import './index.css'

const SimilarProductItem = props => {
  const {item} = props

  const {id, imageUrl, title, price, brand, rating} = item

  return (
    <li className="similarProductItem-container">
      <img
        className="SimilarProductItem-img"
        alt={`similar product ${id}`}
        src={imageUrl}
      />
      <h1 className="SimilarProductItem-heading">{title}</h1>
      <p className="SimilarProductItem-brand">by {brand}</p>
      <div className="SimilarProductItem-rsreviews">
        <p className="SimilarProductItem-price">Rs {price}/-</p>
        <button type="button" className="SimilarProductItem-ratingButton">
          {rating}{' '}
          <img
            className="SimilarProductItem-ratingButtonImg"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </button>
      </div>
    </li>
  )
}

export default SimilarProductItem
