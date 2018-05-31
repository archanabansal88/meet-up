import React from 'react'

class GithubOauth extends React.Component {
  constructor () {
    super()
    this.startLogin.bind(this)
  }
  startLogin () {
    fetch('https://github.com/login/oauth/authorize?client_id=5a57bd199dea74e2f36f', {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'X-Accept-Charset,X-Accept,Content-Type,Credentials'
        //   client_id: '5a57bd199dea74e2f36f'
        // },
        // mode: 'no-cors'
      }
    })
      .then(res => console.log(res))
  }

  render () {
    return (
      <div>
        <a className='button' onClick={this.startLogin}>
          <span className='icon'>
            <i className='fab fa-github' />
          </span>
          <span style={{fontFamily: 'Roboto,arial,sans-serif', fontSize: 13, color: '#757575', fontWeight: 500}}>Sign in</span>
        </a>
      </div>
    )
  }
}

export default GithubOauth
