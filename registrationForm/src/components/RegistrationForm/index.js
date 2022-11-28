// Write your JS code here
// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    showErrorNameF: false,
    errorMsgF: '',
    showErrorNameL: false,
    errorMsgL: '',
    success: false,
    colorF: '',
    colorL: '',
  }

  onChangeFirstName = event => {
    this.setState({firstname: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastname: event.target.value})
  }

  onBlurFirstName = () => {
    const {firstname} = this.state

    let msg = ''

    const col = 'bg-color'

    if (firstname === '') {
      msg = 'Required*'
    }

    this.setState(prevState => {
      if (!prevState.firstname) {
        return {errorMsgF: msg, showErrorNameF: true, colorF: col}
      }
      return {errorMsg: '', showErrorNameF: false, colorF: ''}
    })
  }

  onBlurLastName = () => {
    const {lastname} = this.state
    let msg = ''

    const col = 'bg-color'
    if (lastname === '') {
      msg = 'Required*'
    }

    this.setState(prevState => {
      if (!prevState.lastname) {
        return {errorMsgL: msg, showErrorNameL: true, colorL: col}
      }
      return {errorMsgL: '', showErrorNameL: false, colorL: ''}
    })
  }

  onSubmitSuccess = () => {
    this.setState({
      success: true,
      showErrorNameF: false,
      showErrorNameL: false,
      firstname: '',
      lastname: '',
      colorF: '',
      colorL: '',
      errorMsgF: '',
      errorMsgL: '',
    })
  }

  submitForm = event => {
    event.preventDefault()
    const {firstname, lastname} = this.state

    if (firstname && lastname) {
      this.onSubmitSuccess()
    } else {
      this.onBlurFirstName()
      this.onBlurLastName()
    }
  }

  onToggleButton = () => {
    this.setState(prevState => ({success: !prevState.success}))
  }

  render() {
    const {
      firstname,
      lastname,
      showErrorNameF,
      errorMsgF,
      showErrorNameL,
      errorMsgL,
      success,
      colorF,
      colorL,
    } = this.state

    console.log(success)

    return (
      <div className="container">
        <div className="bg-container">
          <h1 className="heading">Registration</h1>
          {!success ? (
            <form className="form-container" onSubmit={this.submitForm}>
              <div className="form-items">
                <div className="input-item">
                  <label className="label" htmlFor="firstname">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className={`input-container ${colorF}`}
                    value={firstname}
                    placeholder="First name"
                    onChange={this.onChangeFirstName}
                    onBlur={this.onBlurFirstName}
                  />
                  {showErrorNameF && (
                    <p className="error-message">{errorMsgF}</p>
                  )}
                </div>
                <div className="input-item">
                  <label className="label" htmlFor="lastname">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className={`input-container ${colorL}`}
                    value={lastname}
                    placeholder="Last name"
                    onChange={this.onChangeLastName}
                    onBlur={this.onBlurLastName}
                  />
                  {showErrorNameL && (
                    <p className="error-message">{errorMsgL}</p>
                  )}
                </div>
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <div className="form-container">
              <div className="success-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
                  alt="success"
                  className="success-img"
                />
                <p className="success-para">Submitted Successfully</p>
                <button
                  type="button"
                  className="button"
                  onClick={this.onToggleButton}
                >
                  Submit Another Response
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
