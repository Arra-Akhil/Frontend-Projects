import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobListItem = props => {
  const {jobItemDetails} = props
  const {
    title,
    rating,
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
  } = jobItemDetails

  return (
    <Link to={`/jobs/${id}`} className="job-link-item">
      <li key={id} className="list-item-1">
        <div className="icon-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="title-name">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-job-type-container">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location">{location}</p>
            <BsFillBriefcaseFill className="emp-icon" />
            <p className="employment">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <div className="description-container">
          <h1 className="description-title">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobListItem
