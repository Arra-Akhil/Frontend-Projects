import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiExternalLink} from 'react-icons/hi'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    lifeAtCompany: {},
    skills: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        title: jobDetails.title,
      }

      const {lifeAtCompany, skills} = updatedJobDetails

      const updatedLifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }

      const updatedSkills = skills.map(skill => ({
        imageUrl: skill.image_url,
        name: skill.name,
      }))

      const updatedSimilarJobs = similarJobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        lifeAtCompany: updatedLifeAtCompany,
        skills: updatedSkills,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsContainer = () => {
    const {jobDetails, similarJobs, lifeAtCompany, skills} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,

      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <>
        <div className="job-details-container">
          <div className="icon-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="rating-title-container">
              <h1 className="title">{title}</h1>
              <div className="icon-container">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-job-type-container">
            <div className="location-job-container">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>

              <BsFillBriefcaseFill className="emp-icon" />
              <p className="emp-type">{employmentType}</p>
            </div>
            <p className="package-perA">{packagePerAnnum}</p>
          </div>
          <hr className="separator-1" />
          <div className="description-container-1">
            <h1 className="description-heading">Description</h1>
            <a className="description-link" href={companyWebsiteUrl}>
              Visit
              <HiExternalLink />
            </a>
          </div>
          <p className="job-description-1">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skill-items-container">
              {skills.map(skill => (
                <li className="skill-container" key={skill.name}>
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="skill-img"
                  />
                  <p className="skill-name">{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="life-at-company-container">
            <div className="life-at-company">
              <h1 className="life-heading">Life at Company</h1>
              <p className="life-description">{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-job-items-container">
            {similarJobs.map(job => (
              <SimilarJobItem jobItemDetails={job} key={job.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () =>
    this.setState(
      {apiStatus: apiStatusConstants.inProgress},
      this.componentDidMount,
    )

  renderFailureView = () => (
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
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsContainer()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-bg-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobDetails
