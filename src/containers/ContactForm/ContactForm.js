import React, { Component } from 'react'

/**
 * Custom React Select plugin by Jed Watson
 * @see {@link https://github.com/JedWatson/react-select}
 */
import 'react-select/dist/react-select.css';
import Select from 'react-select'
import { validateEmail } from '../../helpers'
import BirthField from '../../components/ContactForm/ContactFormBirth'

const CATEGORIES = ['Science', 'Advertisement', 'Politics', 'Events']

class ContactForm extends Component {
  state = {
    formData: {
      fullname: {
        value: '',
        touched: false,
        hasErrors: false,
        error: ''
      },
      email: {
        value: '',
        touched: false,
        hasErrors: false,
        error: ''
      },
      category: {
        value: '',
        touched: false,
        hasErrors: false,
        error: ''
      },
      favouriteBrands: {
        value: [],
        touched: false,
        hasErrors: false,
        error: ''
      },
      dateOfBirth: {
        year: null,
        month: null,
        day: null
      }
    },
    categories: [],
    formIsValid: false
  }

  componentWillMount() {
    let categories = CATEGORIES.map(cat => {
      return { label: cat, value: cat }
    })
    this.setState({categories})
  }

  /**
  * Updates specified field in form
  *
  * @param {Object|string|string[]} value - New value
  * @param {string} target - Field name to update
  */
  updateFormFieldValue = (value, target) => {
    if (target === 'favouriteBrands' && value.length > 5) {
      return false
    }
    let formData = { ...this.state.formData }
    let updatedField = { ...formData[target] }
    updatedField.value = value
    formData[target] = updatedField
    this.setState({formData})
  }

  validateField = (value, field) => {
    let formData = { ...this.state.formData }

    switch (field) {
      case 'fullname':
        let updatedFullname = { ...formData.fullname }
        // Splits and removes whitespaces from fullname field's value
        let fullnameWords = value.split(' ').filter(x => /\S/.test(x))
        if (fullnameWords.length < 2) {
          updatedFullname.hasErrors = true
          updatedFullname.error = fullnameWords.length === 0 ? 'This field is required' : 'You need to type both: name and surname'
        } else {
          updatedFullname.hasErrors = false
          updatedFullname.error = ''
        }
        formData.fullname = updatedFullname
        break
      case 'email':
        let updatedEmail = { ...formData.email }
        if (!validateEmail(value)) {
          updatedEmail.hasErrors = true
          updatedEmail.error = 'Type a valid email please'
        } else {
          updatedEmail.hasErrors = false
          updatedEmail.error = ''
        }
        formData.email = updatedEmail
        break
      default:
        return false
    }
    this.setState({formData})
  }

  submitForm = (event) => {
    event.preventDefault()
    alert('Submitting')
  }

  updateBirth = (value, target) => {
    let formData = { ...this.state.formData }
    let updatedBirth = { ...formData.dateOfBirth }
    updatedBirth[target] = value
    formData.dateOfBirth = updatedBirth
    this.setState({formData})
  }
  
  render() {
    let { fullname, category, email, favouriteBrands } = this.state.formData
    let { categories } = this.state

    let fullnameError = null
    if (fullname.hasErrors) {
      fullnameError = <span>{fullname.error}</span>
    }

    let emailError = null
    if (email.hasErrors) {
      emailError = <span>{email.error}</span>
    }

    return (
      <div className="form ms_t-center weight_200">
        <form onSubmit={this.submitForm}>
          <div className="form__header">
            <h2 className="weight_300">Get in touch with us</h2>
          </div>
          <div className="form__body">
            <div className="layout md">
              <div className="ms_24 ml_12 Select--single">
                <div className="Select-control">
                  <input 
                    value={fullname.value}
                    type="text"
                    onBlur={(event) => this.validateField(event.target.value, 'fullname')}
                    onChange={(event) => this.updateFormFieldValue(event.target.value, 'fullname')}
                    placeholder="Fullname.." 
                    className="Select-value" />
                </div>
                {fullnameError}
              </div>
              <div className="ms_24 ml_12 Select--single">
                <div className="Select-control">
                  <input 
                    value={email.value}
                    onBlur={(event) => this.validateField(event.target.value, 'email')}
                    onChange={(event) => this.updateFormFieldValue(event.target.value, 'email')}
                    placeholder="Email.." 
                    className="Select-value" />
                </div>
                {emailError}
              </div>
              <div className="ms_24 ml_12">
                <BirthField 
                  date={this.state.formData.dateOfBirth}
                  onChange={(value, target) => this.updateBirth(value, target)}
                />
              </div>
              <div className="ms_24 ml_12">
                <Select
                  name="categories"
                  value={category.value}
                  placeholder="Select category.."
                  onChange={(value) => this.updateFormFieldValue(value ? value.value : null, 'category')}
                  options={categories}
                />
              </div>
              <div className="ms_24">
                <Select.Creatable
                  multi
                  options={[]}
                  noResultsText=""
                  onChange={(value) => this.updateFormFieldValue(value, 'favouriteBrands')}
                  value={favouriteBrands.value}
                />
              </div>
            </div>
          </div>
          <div className="form__footer">
            <button disabled={!this.state.formIsValid} className="btn btn__submit--primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
    )    
  }
}

export default ContactForm