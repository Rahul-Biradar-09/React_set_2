import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-spinner-loader'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import {FaStar} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

import {IoBriefcaseSharp} from 'react-icons/io5'

import './index.css'

import Header from '../Header'

import JobFilters from '../JobFilters'

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
  initial: 'Loading',
  success: 'Success',
  failure: 'Failure',
}

class JobsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: {},
    jobsItems: [],
    search: '',
    employment: '',
    salary: '',
    title: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const api = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileInfo = {
        name: data.name,
        imageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      this.setState({
        profileDetails: profileInfo,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getJobsDetails = async () => {
    const {search, employment, salary} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const api = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${salary}&search=${search}`
    const response = await fetch(api, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobsInfo = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyUrl: eachItem.company_image_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        annualPackage: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      if (jobsInfo.length !== 0) {
        this.setState({
          jobsItems: jobsInfo,
          title: jobsInfo.title,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.renderNoJobs()
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileLoading = () => {
    return (
      <div className="retry-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {name, imageUrl, shortBio} = profileDetails

    return (
      <div className="B1">
        <img src={imageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  retryButton = () => {
    this.setState(
      {apiStatus: apiStatusConstants.initial},
      this.getProfileDetails,
    )
  }

  renderProfileFailure = () => {
    return (
      <div className="retry-container">
        <button
          type="button"
          className="retry-button"
          onClick={this.retryButton}
        >
          Retry
        </button>
      </div>
    )
  }

  renderProfileInfo = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderProfileLoading()
      case apiStatusConstants.success:
        return this.renderProfileSuccess()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  renderNoJobs = () => {
    return (
      <div className="job-cards-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-image"
        />
        <h1 className="no-job-head">No Jobs Found</h1>
        <p className="no-job-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderJobsLoading = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderJobsSuccess = () => {
    const {jobsItems} = this.state
    const {
      id,
      companyUrl,
      employmentType,
      jobDescription,
      location,
      annualPackage,
      rating,
      title,
    } = jobsItems

    return (
      <div className="job-cards-container">
        <Link to="/jobs/id" className="link-item">
          <li key={id}>
            <div className="job-description-container">
              <div className="J1">
                <img
                  src={companyUrl}
                  alt="company logo"
                  className="company-image"
                />
                <div className="J2">
                  <h1 className="job-title">{title}</h1>
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
                <h1 className="salary-text1">Description</h1>
                <p className="work-text2">{jobDescription}</p>
              </div>
            </div>
          </li>
        </Link>
      </div>
    )
  }

  jobsretryButton = () => {
    this.setState({apiStatus: apiStatusConstants.initial}, this.getJobsDetails)
  }

  renderJobsFailure = () => {
    return (
      <div className="job-cards-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="no-job-image"
        />
        <h1 className="no-job-head">Oops! Something Went Wrong</h1>
        <p className="no-job-para">
          We cannot seam to find the page your looking for.
        </p>
        <button
          type="button"
          className="retry-button"
          onClick={this.jobsretryButton}
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobsInfo = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderJobsLoading()
      case apiStatusConstants.success:
        return this.renderJobsSuccess()
      case apiStatusConstants.failure:
        return this.renderJobsFailure()
      default:
        return null
    }
  }

  searchInput = event => {
    this.setState({search: event.target.value})
  }

  searchKey = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  searchIcon = () => {
    this.getJobsDetails()
    this.setState({search: ''})
  }

  employmentValue = id => {
    this.setState({employment: id}, this.getJobsDetails)
  }

  salaryValue = id => {
    this.setState({salary: id}, this.getJobsDetails)
  }

  render() {
    return (
      <div className="jobsRoute-bg-container">
        <Header />
        <div className="jobsRoute-bottom-container">
          <div className="side-panel">
            {this.renderProfileInfo()}
            <hr className="line" />
            <JobFilters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              employmentValue={this.employmentValue}
              salaryValue={this.salaryValue}
            />
          </div>
          <ul className="list">
            <div className="main-panel">
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.searchInput}
                  onKeyDown={this.searchKey}
                />
                <button
                  type="button"
                  className="search-button"
                  data-testid="searchButton"
                  onClick={this.searchIcon}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderJobsInfo()}
            </div>
          </ul>
        </div>
      </div>
    )
  }
}

export default JobsRoute
