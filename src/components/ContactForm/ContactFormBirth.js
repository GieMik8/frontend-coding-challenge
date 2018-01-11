import React from 'react'
import Select from 'react-select';

const MONTHS = [
  { value: 1, label: 'January'},
  { value: 2, label: 'February'},
  { value: 3, label: 'March'},
  { value: 4, label: 'April'},
  { value: 5, label: 'May'},
  { value: 6, label: 'June'},
  { value: 7, label: 'July'},
  { value: 8, label: 'August'},
  { value: 9, label: 'September'},
  { value: 10, label: 'October'},
  { value: 11, label: 'November'},
  { value: 12, label: 'December'},
]

const YEARS = []
const thisYear = new Date().getFullYear()

for (let year = thisYear - 100; year < thisYear; year++ ) {
  YEARS.push({ value: year, label: year})
}

const BirthField = (props) => {
  let days = []

  if (props.date.year && props.date.month) {
    let daysOfMonth = new Date(props.date.year.value, props.date.month.value, 0).getDate();
    for (let day = 0; day < daysOfMonth; day++ ) {
      days.push({ value: day, label: day })
    }
  }

  return (
    <div className="layout md">
      <div className="ms_4">
        <p>Born:</p>
      </div>
      <div className="ms_6">
        <Select 
          name="year"
          value={props.date.year}
          clearable={false}
          placeholder="Year.."
          onChange={(value) => props.onChange(value, 'year')}
          options={YEARS}
        />
      </div>
      <div className="ms_9">
        <Select 
          name="month"
          value={props.date.month}
          clearable={false}
          disabled={!props.date.year}
          placeholder="Month.."
          onChange={(value) => props.onChange(value, 'month')}
          options={MONTHS}
        />
      </div>
      <div className="ms_5">
        <Select 
          name="day"
          value={props.date.day}
          clearable={false}
          disabled={!props.date.year || !props.date.month}
          placeholder="Day.."
          onChange={(value) => props.onChange(value, 'day')}
          options={days}
        />
      </div>
    </div>
  )
}

export default BirthField