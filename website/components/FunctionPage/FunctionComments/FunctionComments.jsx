import { useState, useEffect, useContext, useRef, useCallback } from 'react'
import Link from 'next/link'
import { UserContext } from '../../../contexts/UserContext'
import CommentCard from '../CommentCard/CommentCard'
import Loader from '../../Loader'
import api from '../../../utils/api'

const FunctionComments = ({ functionId }) => {
  // State pour poster un commentaire
  const { isAuth, user } = useContext(UserContext)
  const [inputState, setInputState] = useState({})

  // State pour afficher les commentaires
  const [commentsData, setCommentsData] = useState({ hasMore: true, rows: [] })
  const [isLoadingComments, setLoadingComments] = useState(true)
  const [pageComments, setPageComments] = useState(1)

  // Récupère les commentaires si la page change
  useEffect(() => {
    getCommentsData().then(data =>
      setCommentsData({
        hasMore: data.hasMore,
        rows: [...commentsData.rows, ...data.rows]
      })
    )
  }, [pageComments])

  // Permet la pagination au scroll
  const observer = useRef()
  const lastCommentCardRef = useCallback(
    node => {
      if (isLoadingComments) return
      if (observer.current) observer.current.disconnect()
      observer.current = new window.IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && commentsData.hasMore) {
            setPageComments(pageComments + 1)
          }
        },
        { threshold: 1 }
      )
      if (node) observer.current.observe(node)
    },
    [isLoadingComments, commentsData.hasMore]
  )

  const getCommentsData = async () => {
    setLoadingComments(true)
    const { data } = await api.get(
      `/comments/${functionId}/?page=${pageComments}&limit=10`
    )
    setLoadingComments(false)
    return data
  }

  const handleChange = event => {
    const inputStateNew = { ...inputState }
    inputStateNew[event.target.name] = event.target.value
    setInputState(inputStateNew)
  }

  const handleSubmit = async event => {
    setLoadingComments(true)
    event.preventDefault()
    const token = user.token
    if (isAuth && token != null && inputState.commentPost != null) {
      try {
        const response = await api.post(
          `/comments/${functionId}`,
          { message: inputState.commentPost },
          { headers: { Authorization: token } }
        )
        const comment = {
          ...response.data,
          user: { name: user.name, logo: user.logo }
        }
        setCommentsData({
          hasMore: commentsData.hasMore,
          rows: [comment, ...commentsData.rows]
        })
        setInputState({ commentPost: '' })
      } catch {}
    }
    setLoadingComments(false)
  }

  return (
    <>
      <div className='FunctionComments__post container-fluid'>
        <div className='row FunctionComments__row'>
          <div className='col-24'>
            {isAuth
              ? (
                <form onSubmit={handleSubmit}>
                  <div className='form-group FunctionComments__post-group'>
                    <label className='form-label' htmlFor='commentPost'>
                      Ajouter un commentaire :
                    </label>
                    <textarea
                      className='FunctionComments__textarea form-control'
                      value={inputState.commentPost}
                      onChange={handleChange}
                      name='commentPost'
                      id='commentPost'
                      placeholder="Idée d'amélioration, avis, remarque, partage d'expérience personnel, ... (Markdown autorisé)"
                    />
                  </div>
                  <div className='form-group' style={{ marginTop: '0.7em' }}>
                    <button type='submit' className='btn btn-dark'>
                      Envoyer
                    </button>
                  </div>
                </form>
                )
              : (
                <p className='text-center'>
                  Vous devez être{' '}
                  <Link href='/users/login'>
                    <a>connecté</a>
                  </Link>{' '}
                  pour poster un commentaire.
                </p>
                )}
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        {isLoadingComments && (
          <div className='row justify-content-center'>
            <Loader />
          </div>
        )}
        <div className='row justify-content-center'>
          {commentsData.rows.map((comment, index) => {
            // Si c'est le dernier élément
            if (commentsData.rows.length === index + 1) {
              return (
                <CommentCard
                  key={comment.id}
                  ref={lastCommentCardRef}
                  {...comment}
                  manageComment={{
                    setCommentsData,
                    commentsData,
                    setLoadingComments
                  }}
                />
              )
            }
            return (
              <CommentCard
                key={comment.id}
                {...comment}
                manageComment={{
                  setCommentsData,
                  commentsData,
                  setLoadingComments
                }}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default FunctionComments
