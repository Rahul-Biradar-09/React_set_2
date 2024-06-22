import {FaExternalLinkAlt} from 'react-icons/fa'

import {FaStar} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

import {IoBriefcaseSharp} from 'react-icons/io5'

import './index.css'

const JobItem = props => {
  const {jobItemDetails} = props
  const {companyUrl, companyWebsiteUrl, employmentType, jobDescription, skills, lifeAtCompany, 
  location, annualPackage, rating} = jobItemDetails
  const {imagecompanyUrl, description} = lifeAtCompany
  return (
    <div className="JobItem-container">
      <div className="J1">
        <img
          src={companyUrl}
          alt="company logo"
          className="company-image"
        />
        <div className="J2 J3">
          <h1 className="job-title">Devops Developer</h1>
          <div className="rating-container">
            <FaStar className="star-icon" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-container">
        <div className="location-employement-container">
          <div className="L1">
            <IoLocationSharp className="work-icon" />
            <p className="work-text">{location}</p>
          </div>
          <div className="L1">
            <IoBriefcaseSharp className="work-icon" />
            <p className="work-text">{employmentType}</p>
          </div>
        </div>
        <p className="salary-text">{annualPackage}</p>
      </div>
      <hr className="line" />
      <div className="description-container">
        <div className="link-container">
          <h1 className="salary-text1 salary-text2">Description</h1>
          <a href={companyWebsiteUrl} target="_blank" className="link-text">
            Visit <FaExternalLinkAlt className="link-icon" />
          </a>
        </div>
        <p className="work-text2 work-text3">
        {jobDescription}
        </p>
      </div>
      <h1 className="skills-text">Skills</h1>
      <div className="skills-container">
        {skills.map(eachItem => (<div className="skills-Item" >
          <img
            src={eachItem.imageUrl}
            alt={`name ${eachItem.name}`}
            className="skills-icon"
          />
          <p className="skills-para">{eachItem.name}</p>
        </div>))}
      </div>
      <h1 className="skills-text">Life at Company</h1>
      <div className="life-at-company-container">
        <div className="life-at-company-description-container">
          <p className="work-text2 work-text3">
            {description}
          </p>
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
