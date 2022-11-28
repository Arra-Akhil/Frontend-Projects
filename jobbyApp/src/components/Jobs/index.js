import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import JobListItem from '../JobListItem'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstantsProfile = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    searchInput: '',
    activeEmpType: [],
    activeSalaryRangeId: '',
    apiStatus: apiStatusConstants.initial,
    apiProfileStatus: apiStatusConstantsProfile.initial,
  }

  componentDidMount() {
    this.getJobsList()
    this.getProfileDetails()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeEmpType = empTypeId => {
    this.setState(prevState => {
      if (!prevState.activeEmpType.includes(empTypeId)) {
        return {activeEmpType: [...prevState.activeEmpType, empTypeId]}
      }
      return {activeEmpType: [...prevState.activeEmpType]}
    }, this.getJobsList)
  }

  onChangeSalary = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobsList)
  }

  onClickSearchButton = () => {
    const {jobsList, searchInput} = this.state

    const filteredJobsList = jobsList.filter(jobItem =>
      jobItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    this.setState({jobsList: filteredJobsList, searchInput: ''})
  }

  onSearchKeyDown = event => {
    if (event.key === 'Enter') {
      this.onClickSearchButton()
    }
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-details-container">
        <div className="profile-name-container">
          <img src={profileImageUrl} className="profile-img" alt="profile" />
          <h1 className="name-heading">{name}</h1>
        </div>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  getProfileDetails = async () => {
    this.setState({apiProfileStatus: apiStatusConstantsProfile.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiProfileStatus: apiStatusConstantsProfile.success,
      })
    } else {
      this.setState({
        apiProfileStatus: apiStatusConstantsProfile.failure,
      })
    }
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {searchInput, activeEmpType, activeSalaryRangeId} = this.state

    const activeEmpTypes = activeEmpType.join(',')
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmpTypes}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsList = () => {
    const {searchInput, jobsList} = this.state
    console.log(searchInput)
    const isTrue = jobsList.length > 0

    return (
      <div>
        <div className="input-container">
          <input
            type="search"
            className="input-element-1"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onSearchKeyDown}
          />
          <div className="search-container">
            <button
              type="button"
              className="search-button"
              onClick={this.onClickSearchButton}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
        </div>
        <ul className="jobs-list-container-1">
          {isTrue ? (
            jobsList.map(jobItem => (
              <JobListItem jobItemDetails={jobItem} key={jobItem.id} />
            ))
          ) : (
            <div className="jobs-failure-view-container no-jobs-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                className="failure-img"
                alt="no jobs"
              />
              <h1 className="failure-heading">No Jobs Found</h1>
              <p className="failure-description">
                We could not find any jobs. Try other filters.
              </p>
            </div>
          )}
        </ul>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileLoaderView = () => (
    <div className="loader-profile-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRefresh = () => {
    this.setState(
      {apiStatus: apiStatusConstants.inProgress},
      this.componentDidMount,
    )
  }

  onClickRefreshProfile = () => {
    this.setState(
      {apiProfileStatus: apiStatusConstantsProfile.inProgress},
      this.componentDidMount,
    )
  }

  renderJobsFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onClickRefresh}
      >
        Retry
      </button>
    </div>
  )

  renderProfileFailureView = () => (
    <div className="failure-button-container">
      <button
        className="failure-button"
        type="button"
        onClick={this.onClickRefreshProfile}
      >
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  renderProfile = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.inProgress:
        return this.renderProfileLoaderView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeEmpType, activeSalaryRangeId, profileDetails} = this.state

    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="filters-container">
            {this.renderProfile()}
            <FiltersGroup
              activeEmpType={activeEmpType}
              onChangeEmpType={this.onChangeEmpType}
              employmentTypesList={employmentTypesList}
              activeSalaryRange={activeSalaryRangeId}
              salaryRangesList={salaryRangesList}
              onChangeSalary={this.onChangeSalary}
              profileDetails={profileDetails}
              renderLoaderView={this.renderLoaderView}
            />
          </div>
          <div className="jobs-container">{this.renderJobs()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
