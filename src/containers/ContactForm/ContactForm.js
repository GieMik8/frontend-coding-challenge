import React, { Component } from 'react'
/**
 * Custom React Select plugin by Jed Watson
 * @see {@link https://github.com/JedWatson/react-select}
 */
import Select from 'react-select'
import { validateEmail } from '../../helpers'
import BirthField from '../../components/ContactForm/ContactFormBirth'

const CATEGORIES = ['Science', 'Advertisement', 'Politics', 'Events']

const initialState = {
  formData: {
    fullname: {
      value: '',
      hasErrors: false,
      error: '',
      valid: false
    },
    email: {
      value: '',
      hasErrors: false,
      error: '',
      valid: false
    },
    category: {
      value: '',
      hasErrors: false,
      error: '',
      valid: false
    },
    favouriteBrands: {
      value: [],
      hasErrors: false,
      error: ''
    },
    dateOfBirth: {
      year: null,
      month: null,
      day: null,
      hasErrors: false,
      error: '',
      valid: true
    }
  },
  categories: CATEGORIES.map(cat => {
    return { label: cat, value: cat }
  }),
  formIsValid: false,
  submitted: false
}

class ContactForm extends Component {
  state = initialState

  /**
  * Updates specified field in form
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
    updatedField.valid = value ? true : false
    formData[target] = updatedField

    let updatedFormIsValid = true
    for (let field in formData) {
      updatedFormIsValid = formData[field].valid && updatedFormIsValid
    }

    this.setState({formData, formIsValid: updatedFormIsValid})
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
          updatedFullname.valid = false
        } else {
          updatedFullname.hasErrors = false
          updatedFullname.error = ''
          updatedFullname.valid = true
        }
        formData.fullname = updatedFullname
        break
      case 'email':
        let updatedEmail = { ...formData.email }
        if (!validateEmail(value)) {
          updatedEmail.hasErrors = true
          updatedEmail.error = 'Type a valid email please'
          updatedEmail.valid = false
        } else {
          updatedEmail.hasErrors = false
          updatedEmail.error = ''
          updatedEmail.valid = true
        }
        formData.email = updatedEmail
        break
      default:
        return false
    }
    this.setState({formData})
  }

  submitForm = event => {
    event.preventDefault()
    let formData = this.state.formData
    let favouriteBrands = formData.favouriteBrands.value.map(x => x.label)
    let data = {
      fullname: formData.fullname.value,
      email: formData.email.value,
      dateOfBirth: `${formData.dateOfBirth.year.value}/${formData.dateOfBirth.month.value}/${formData.dateOfBirth.day.value}`,
      category: formData.category.value,
      favouriteBrands: favouriteBrands.join(', ')
    }
    console.log(data)
    this.setState({ ...initialState, submitted: true })
    setTimeout(() => {
      this.setState({submitted: false})
    }, 5000)
  }

  updateBirth = (value, target) => {
    let formData = { ...this.state.formData }
    let updatedBirth = { ...formData.dateOfBirth, [target]: value }
    updatedBirth.valid = updatedBirth.year && updatedBirth.month && updatedBirth.day
    formData.dateOfBirth = updatedBirth

    let updatedFormIsValid = true
    for (let field in formData) {
      updatedFormIsValid = formData[field].valid && updatedFormIsValid
    }
    
    this.setState({formData, formIsValid: updatedFormIsValid})
  }
  
  render() {
    let { fullname, category, email, favouriteBrands, dateOfBirth } = this.state.formData
    let { submitted, categories } = this.state

    let fullnameError = null
    if (fullname.hasErrors) {
      fullnameError = <small className="ms_t-left error-message">{fullname.error}</small>
    }

    let emailError = null
    if (email.hasErrors) {
      emailError = <small className="ms_t-left error-message">{email.error}</small>
    }

    let dateOfBirthError = null
    if (dateOfBirth.hasErrors) {
      dateOfBirthError = <small className="ms_t-left error-message">{dateOfBirth.error}</small>
    }

    let categoryError = null
    if (category.hasErrors) {
      categoryError = <small className="ms_t-left error-message">{category.error}</small>
    }

    let submitionConfirmed = null
    if (submitted) {
      submitionConfirmed = <h4 className="weight_300 striped"><span>Succesfully submitted! Check the console..</span></h4>
    }

    return (
      <div className="layout m_a-center">
        <div className="form form__wrapper ms_24 ms_t-center weight_200">
          <form onSubmit={this.submitForm}>
            <div className="form form__header">
              <h2 className="weight_300 striped"><span>Get in touch with us</span></h2>
            </div>
            <div className="form form__body">
              <div className="layout md">
                <div className="ms_24 ts_12 Select--single">
                  <div className="Select-control">
                    <input 
                      value={fullname.value}
                      type="text"
                      onBlur={event => this.validateField(event.target.value, 'fullname')}
                      onChange={event => this.updateFormFieldValue(event.target.value, 'fullname')}
                      placeholder="Fullname" 
                      className="Select-value" />
                  </div>
                  {fullnameError}
                </div>
                <div className="ms_24 ts_12 Select--single">
                  <div className="Select-control">
                    <input 
                      value={email.value}
                      onBlur={event => this.validateField(event.target.value, 'email')}
                      onChange={event => this.updateFormFieldValue(event.target.value, 'email')}
                      placeholder="Email" 
                      className="Select-value" />
                  </div>
                  {emailError}
                </div>
                <div className="ms_24 ts_12">
                  <BirthField 
                    date={this.state.formData.dateOfBirth}
                    onChange={(value, target) => this.updateBirth(value, target)}
                  />
                  {dateOfBirthError}
                </div>
                <div className="ms_24 ts_12">
                  <Select
                    name="categories"
                    value={category.value}
                    clearable={false}
                    placeholder="Select category"
                    onChange={value => this.updateFormFieldValue(value ? value.value : null, 'category')}
                    options={categories}
                  />
                  {categoryError}
                </div>
                <div className="ms_24">
                  <Select.Creatable
                    multi
                    options={[]}
                    noResultsText=""
                    placeholder="Your favourite brands"
                    onChange={value => this.updateFormFieldValue(value, 'favouriteBrands')}
                    value={favouriteBrands.value}
                  />
                </div>
              </div>
            </div>
            <div className="form form__footer">
              <button 
                disabled={!this.state.formIsValid} 
                title={!this.state.formIsValid ? 'Fill the form' : null}
                className="btn btn__submit--primary" 
                type="submit">Submit</button>
            </div>
            {submitionConfirmed}
          </form>
        </div>
      </div>
    )    
  }
}

export default ContactForm