import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'

import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {count: 1, loading: '', productItem: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({loading: 'loading'})

    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)

    if (response.ok) {
      const data = await response.json()

      const productItem = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products.map(each => ({
          id: each.id,
          imageUrl: each.image_url,
          title: each.title,
          price: each.price,
          description: each.description,
          brand: each.brand,
          totalReviews: each.total_reviews,
          rating: each.rating,
          availability: each.availability,
        })),
      }

      this.setState({loading: 'success', productItem})
    } else {
      this.setState({loading: 'failure'})
    }
  }

  increaseCount = () =>
    this.setState(prevState => ({count: prevState.count + 1}))

  decreaseCount = () =>
    this.setState(prevState => ({count: prevState.count - 1}))

  goToProducts = () => {
    const {history} = this.props

    history.push('/products')
  }

  renderSuccess = () => {
    const {productItem, count} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = productItem

    return (
      <>
        <Header />
        <div className="productItemDetails-container">
          <div className="productItemDetails-productItem">
            <img
              className="productItemDetails-img"
              alt="product"
              src={imageUrl}
            />
            <div className="productItemDetails-topSection">
              <h1 className="productItemDetails-topSection-heading">{title}</h1>
              <p className="productItemDetails-topSection-price">
                Rs {price}/-
              </p>
              <div className="productItemDetails-topSection-ratingContainer">
                <p className="productItemDetails-topSection-ratingButton">
                  {rating}{' '}
                  <img
                    className="productItemDetails-topSection-ratingButtonImg"
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                  />
                </p>
                <p className="productItemDetails-topSection-reviewspara">
                  {totalReviews} Reviews
                </p>
              </div>
              <p className="productItemDetails-topSection-description">
                {description}
              </p>
              <div className="productItemDetails-topSection-brandContainer">
                <p className="productItemDetails-topSection-availability">
                  Available:
                </p>
                <p className="productItemDetails-topSection-availability-span">
                  {availability}
                </p>
              </div>
              <div className="productItemDetails-topSection-brandContainer">
                <p className="productItemDetails-topSection-availability">
                  Brand:
                </p>
                <p className="productItemDetails-topSection-availability-span">
                  {brand}
                </p>
              </div>
              <div className="productItemDetails-topSection-counterCounter">
                <button
                  data-testid="minus"
                  type="button"
                  className="productItemDetails-topSection-plusminusButton"
                  onClick={count > 1 ? this.decreaseCount : null}
                >
                  <BsDashSquare className="icon" />
                </button>
                <p className="productItemDetails-topSection-count">{count}</p>
                <button
                  data-testid="plus"
                  type="button"
                  className="productItemDetails-topSection-plusminusButton"
                  onClick={this.increaseCount}
                >
                  <BsPlusSquare className="icon" />
                </button>
              </div>
              <button
                type="button"
                className="productItemDetails-topSection-addToCartButton"
              >
                ADD TO CART
              </button>
            </div>
          </div>
          <h1 className="productItemDetails-similarProducts-heading">
            Similar Products
          </h1>
          <ul className="productItemDetails-similarProducts">
            {similarProducts.map(each => (
              <SimilarProductItem key={each.id} item={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoading = () => (
    <div data-testid="loader" className="productItemDetails-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <>
      <Header />
      <div className="productItemDetails-failure">
        <img
          className="productItemDetails-failureimg"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
        />
        <h1 className="productItemDetails-failureheading">Product Not Found</h1>
        <button
          className="productItemDetails-failurebutton"
          type="button"
          onClick={this.goToProducts}
        >
          Continue Shopping
        </button>
      </div>
    </>
  )

  render() {
    const {loading} = this.state

    switch (loading) {
      case 'success':
        return this.renderSuccess()
      case 'loading':
        return this.renderLoading()
      case 'failure':
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default ProductItemDetails
