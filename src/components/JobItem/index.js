import {FaExternalLinkAlt} from 'react-icons/fa'

import {FaStar} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

import {IoBriefcaseSharp} from 'react-icons/io5'

import './index.css'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    title,
    companyUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    skills,
    lifeAtCompany,
    location,
    annualPackage,
    rating,
  } = jobItemDetails
  const {imagecompanyUrl, description} = lifeAtCompany
  return (
    <div className="JobItem-container">
      <div className="J1-top-container">
        <img src={companyUrl} alt="company logo" className="company-image1" />
        <div className="J3-container">
          <h1 className="job-title1">{title}</h1>
          <div className="rating-container1">
            <FaStar className="star-icon1" />
            <p className="rating-text1">{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-container1">
        <div className="location-employement-container1">
          <div className="L1-container">
            <IoLocationSharp className="work-icon1" />
            <p className="work-text1">{location}</p>
          </div>
          <div className="L1-container">
            <IoBriefcaseSharp className="work-icon1" />
            <p className="work-text1">{employmentType}</p>
          </div>
        </div>
        <p className="salary-text">{annualPackage}</p>
      </div>
      <hr className="hr-line" />
      <div className="description-container">
        <div className="link-container">
          <h1 className="salary-text1 salary-text2">Description</h1>
          <a
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferrer"
            className="link-text"
          >
            Visit <FaExternalLinkAlt className="link-icon" />
          </a>
        </div>
        <p className="work-text2 work-text3">{jobDescription}</p>
      </div>
      <h1 className="skills-text">Skills</h1>
      <ul className="skills-container">
        {skills.map(eachItem => (
          <li
            className="skills-Item"
            key={eachItem.id}
            key={`eachSkill ${eachItem.name}`}
          >
            <img
              src={eachItem.imageUrl}
              alt={`name ${eachItem.name}`}
              className="skills-icon"
            />
            <p className="skills-para">{eachItem.name}</p>
          </li>
        ))}
      </ul>
      <h1 className="skills-text">Life at Company</h1>
      <div className="life-at-company-container">
        <div className="life-at-company-description-container">
          <p className="work-text2 work-text3">{description}</p>
        </div>
        <img
          src={imagecompanyUrl}
          alt="life at company"
          className="description-icon"
        />
      </div>
    </div>
  )
}

export default JobItem
