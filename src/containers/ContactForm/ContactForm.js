import React, { Component } from 'react'

/**
 * Custom React Select plugin by Jed Watson
 * @see {@link https://github.com/JedWatson/react-select}
 */
import 'react-select/dist/react-select.css';
import Select from 'react-select'

const CATEGORIES = ['Science', 'Advertisement', 'Politics', 'Events']

class ContactForm extends Component {
  state = {
    formData: {
      fullname: '',
      category: '',
      email: '',
      favouriteBrands: [],
      dateOfBirth: {
        year: '',
        month: '',
        day: ''
      }
    },
    categories: []
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
  updateFormData = (value, target) => {
    console.log(...arguments)
    let formData = { ...this.state.formData }
    formData[target] = value
    this.setState({formData})
  }
  
  render() {
    let { fullname, category, email, favouriteBrands } = this.state.formData
    let { categories } = this.state

    return (
      <div className="form ms_t-center weight_200">
        <div className="form__header">
          <h2 className="weight_500">Get in touch with us</h2>
        </div>
        <div className="form__body">
          <div className="layout md">
            <div className="ms_24 ml_12 Select--single">
              <div className="Select-control">
                <input 
                  value={fullname}
                  onChange={(event) => this.updateFormData(event.target.value, 'fullname')}
                  placeholder="Fullname" 
                  className="Select-value" />
              </div>
            </div>
            <div className="ms_24 ml_12 Select--single">
              <div className="Select-control">
                <input 
                  value={email}
                  onChange={(event) => this.updateFormData(event.target.value, 'email')}
                  placeholder="Email" 
                  className="Select-value" />
              </div>
            </div>
            <div className="ms_24 ml_12">
              <p>Date of Birth</p>
            </div>
            <div className="ms_24 ml_12">
              <Select
                name="categories"
                value={category}
                placeholder="Select category.."
                onChange={(value) => this.updateFormData(value.value, 'category')}
                options={categories}
              />
            </div>
            <div className="ms_24">
              <Select.Creatable
                multi={true}
                options={[]}
                onChange={(value) => this.updateFormData(value, 'favouriteBrands')}
                value={favouriteBrands}
              />
            </div>
          </div>
        </div>
        <div className="form__footer"></div>
      </div>
    )    
  }
}

export default ContactForm