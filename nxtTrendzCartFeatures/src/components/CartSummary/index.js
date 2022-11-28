// Write your code here
import cartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <cartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(Item => {
        total += Item.quantity * Item.price
      })

      return (
        <div className="cart-summary-container">
          <h1 className="order-total">
            Order Total: <span className="total-rs">Rs {total}/- </span>{' '}
          </h1>
          <p className="items-in-cart">{cartList.length} items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </cartContext.Consumer>
)

export default CartSummary
