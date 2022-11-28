import './index.css'

const FiltersGroup = props => {
  const renderEmpTypeFilters = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(empTypeItem => {
      const {onChangeEmpType} = props

      const onClickEmpItem = () => {
        onChangeEmpType(empTypeItem.employmentTypeId)
      }

      return (
        <li
          key={empTypeItem.employmentTypeId}
          className="input-container-1"
          onClick={onClickEmpItem}
        >
          <input
            type="checkbox"
            id={empTypeItem.employmentTypeId}
            className="checkbox-element"
          />
          <label
            className="emp-label-element"
            htmlFor={empTypeItem.employmentTypeId}
          >
            {empTypeItem.label}
          </label>
        </li>
      )
    })
  }

  const renderEmpFilters = () => (
    <div className="employment-container">
      <h1 className="emp-type-heading">Type of Employment</h1>
      <ul className="emp-type-container">{renderEmpTypeFilters()}</ul>
    </div>
  )

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salaryItem => {
      const {onChangeSalary} = props

      const onClickSalaryItem = () => {
        onChangeSalary(salaryItem.salaryRangeId)
      }

      return (
        <li
          key={salaryItem.salaryRangeId}
          className="input-container-2"
          onClick={onClickSalaryItem}
        >
          <input
            type="radio"
            id={salaryItem.salaryRangeId}
            name="salary"
            className="checkbox-element-circle"
          />
          <label
            className="emp-label-element"
            htmlFor={salaryItem.salaryRangeId}
          >
            {salaryItem.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryFilters = () => (
    <div className="employment-container">
      <h1 className="emp-type-heading">Salary Range</h1>
      <ul className="emp-type-container">{renderSalaryRangeList()}</ul>
    </div>
  )

  return (
    <>
      <hr className="separator-3" />
      {renderEmpFilters()}
      <hr className="separator-3" />
      {renderSalaryFilters()}
    </>
  )
}

export default FiltersGroup
