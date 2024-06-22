import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-spinner-loader'

import './index.css'

import Header from '../Header'

import SimilarJobs from '../SimilarJobs'

import JobItem from '../JobItem'

const apiStatusConstants = {
  initial: 'Loading',
  success: 'Success',
  failure: 'Failure',
}

class JobItemDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobItemDetails: [],
    similarJobs: {},
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const api = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(api, options)
    if (response.ok === true) {
      const data = await response.json()
      const filteredData = {
        companyUrl: data.jobs_details.company_image_url,
        companyWebsiteUrl: data.jobs_details.company_website_url,
        employmentType: data.jobs_details.employment_type,
        jobDescription: data.jobs_details.job_description,
        id: data.jobs_details.id,
        skills: data.jobs_details.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        lifeAtCompany: {
          imagecompanyUrl: data.jobs_details.life_at_company.image_url,
          description: data.jobs_details.life_at_company.description,
        },
        location: data.jobs_details.location,
        annualPackage: data.jobs_details.package_per_annum,
        rating: data.jobs_details.rating,
      }

      const similarData = data.jobs_details.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobItemDetails: filteredData,
        similarJobs: similarData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => {
    return (
      <div className="jobsItem-failure-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderSuccess = () => {
    const {jobItemDeatils, similarJobs} = this.state
    return (
      <div className="JobItem-bg-container">
        <JobItem jobItemDeatils={jobItemDeatils} key={jobItemDeatils.id} />
        <h1 className="salary-text1 salary-text2">Similar Jobs</h1>
        <div className="similar-container">
          {similarJobs.map(eachItem => (
            <SimilarJobs eachItem={eachItem} key={eachItem.id} />
          ))}
        </div>
      </div>
    )
  }

  jobFailureButton = () => {
    this.setState(
      {apiStatus: apiStatusConstants.initial},
      this.getJobItemDetails,
    )
  }

  renderFailure = () => {
    return (
      <div className="jobsItem-failure-container">
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
          onClick={this.jobFailureButton}
        >
          Retry
        </button>
      </div>
    )
  }

  renderjobData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLoading()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="JobItemDetails-container">
        <Header />
        {this.renderjobData()}
      </div>
    )
  }
}

export default JobItemDetailsRoute
