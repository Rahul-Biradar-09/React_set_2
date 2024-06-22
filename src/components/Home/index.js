import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

import Header from '../Header'

class Home extends Component {
  findJobsButton = () => {
    const {history} = this.props
    history.push('/jobs')
  }
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="Home-container">
        <Header />
        <div className="bottom-container">
          <div className="bottom-text-container">
            <h1 className="Head">Find The Job That Fits Your Life</h1>
            <p className="Para">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <button
              type="button"
              className="find-job-button"
              onClick={this.findJobsButton}
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
