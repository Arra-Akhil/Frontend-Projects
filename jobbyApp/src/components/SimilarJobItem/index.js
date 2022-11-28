import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = jobItemDetails

  return (
    <li key={id} className="similar-job-list-item">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-logo"
        />
        <div className="title-rating-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-rating-container">
            <AiFillStar className="similar-star-icon" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="description-container">
        <h1 className="description-heading">Description</h1>
        <p className="similar-job-description">{jobDescription}</p>
      </div>
      <div className="similar-job-location-emp-container">
        <MdLocationOn className="similar-location-icon" />
        <p className="similar-location">{location}</p>
        <BsFillBriefcaseFill className="similar-emp-icon" />
        <p className="similar-emp-type">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
