import React from 'react'
import Select from 'react-select';

const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const MONTHS = monthsList.map((x, index) => {
  return { value: ++index, label: x }
})

const YEARS = []
const thisYear = new Date().getFullYear()

for (let year = thisYear - 100; year < thisYear; year++ ) {
  YEARS.push({ value: year, label: year })
}

const BirthField = (props) => {
  let days = []

  if (props.date.year && props.date.month) {
    let daysOfMonth = new Date(props.date.year.value, props.date.month.value, 0).getDate();
    for (let day = 1; day < daysOfMonth; day++ ) {
      days.push({ value: day, label: day })
    }
  }

  return (
    <div className="layout sm ms_a-center">
      <div className="ms_24 ml_4">
        <p>Born:</p>
      </div>
      <div className="ms_7 ml_6">
        <Select 
          name="year"
          value={props.date.year}
          clearable={false}
          placeholder="Year"
          onChange={value => props.onChange(value, 'year')}
          options={YEARS}
        />
      </div>
      <div className="ms_10 ml_9">
        <Select 
          name="month"
          value={props.date.month}
          clearable={false}
          disabled={!props.date.year}
          placeholder="Month"
          onChange={value => props.onChange(value, 'month')}
          options={MONTHS}
        />
      </div>
      <div className="ms_7 ml_5">
        <Select 
          name="day"
          value={props.date.day}
          clearable={false}
          disabled={!props.date.year || !props.date.month}
          placeholder="Day"
          onChange={value => props.onChange(value, 'day')}
          options={days}
        />
      </div>
    </div>
  )
}

export default BirthField