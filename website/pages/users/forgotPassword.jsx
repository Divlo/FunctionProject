import { useState } from 'react'
import htmlParser from 'html-react-parser'
import Loader from '../../components/Loader'
import HeadTag from '../../components/HeadTag'
import api from '../../utils/api'
import withoutAuth from '../../hoc/withoutAuth'

const forgotPassword = () => {
  const [inputState, setInputState] = useState({})
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const inputStateNew = { ...inputState }
    inputStateNew[event.target.name] = event.target.value
    setInputState(inputStateNew)
  }

  const handleSubmit = (event) => {
    setIsLoading(true)
    event.preventDefault()
    api.post('/users/reset-password', inputState)
      .then(({ data }) => {
        setMessage(`<p class="form-success"><b>Succès:</b> ${data.result}</p>`)
        setIsLoading(false)
        setInputState({})
      })
      .catch((error) => {
        setMessage(`<p class="form-error"><b>Erreur:</b> ${error.response.data.message}</p>`)
        setIsLoading(false)
      })
  }

  return (
    <>
      <HeadTag
        title='Mot de passe oublié - FunctionProject'
        description='Vous vous ne souvenez pas de votre mot de passe ? Demandez une demande de réinitialisation de mot de passe par email.'
      />
      <div className='container Register-Login__container'>
        <div className='row Register-Login__row justify-content-center'>
          <div className='col-20'>
            <h1 className='Register-Login__title'>Mot de passe oublié ?</h1>
            <div className='text-center'>
              <p>Demandez une demande de réinitialisation de mot de passe par email.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label className='form-label' htmlFor='name'>Email :</label>
                <input onChange={handleChange} type='email' name='email' id='email' className='form-control' placeholder='email@gmail.com' />
              </div>
              <div className='form-group text-center'>
                <button type='submit' className='btn btn-dark'>Envoyer</button>
              </div>
            </form>
            <div className='form-result text-center'>
              {
                (isLoading)
                  ? <Loader />
                  : htmlParser(message)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withoutAuth(forgotPassword)
