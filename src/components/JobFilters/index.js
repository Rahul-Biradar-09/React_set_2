import './index.css'

const JobFilters = props => {
  const renderEmploymentInfo = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachItem => {
      const {employmentValue} = props
      const onChangeEmployment = () =>
        employmentValue(eachItem.employmentTypeId)

      return (
        <div
          className="C2"
          key={eachItem.employmentTypeId}
          onClick={onChangeEmployment}
        >
          <input
            type="checkbox"
            className="input-checkbox"
            id={eachItem.employmentTypeId}
          />
          <label className="checkbox-label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </div>
      )
    })
  }

  const renderSalaryInfo = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachItem => {
      const {salaryValue} = props
      const onChangeSalary = () => salaryValue(eachItem.salaryRangeId)

      return (
        <div
          className="C3"
          key={eachItem.salaryRangeId}
          onClick={onChangeSalary}
        >
          <input
            type="radio"
            className="input-checkbox"
            id={eachItem.salaryRangeId}
            name="salary range"
          />
          <label className="checkbox-label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </div>
      )
    })
  }

  return (
    <>
      <div className="B2">
        <h1 className="b2-head">Type of Employment</h1>
        <div className="checkbox-container">{renderEmploymentInfo()}</div>
      </div>
      <hr className="line" />
      <div className="B2">
        <h1 className="b2-head">Salary Range</h1>
        <div className="checkbox-container">{renderSalaryInfo()}</div>
      </div>
    </>
  )
}

export default JobFilters
