import { Button } from 'flowbite-react'
import React from 'react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase'
import {useDispatch} from 'react-redux'
import {signInSuccess} from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom'

const Oauth = () => {
  const auth = getAuth(app)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = async()=>{
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt:'select_account'})
    try{
      const resultFromGoogle = await signInWithPopup(auth, provider)
      const response = await fetch("/api/auth/google", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL
        })
      })
      const data = await response.json()
      if(response.ok)
      {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    }catch(err)
    {

    }
  }
  return (
    <Button type='button' gradientDuoTone="pinkToOrange" outline onClick={handleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      <span>Continue with Google</span>
    </Button>
  )
}

export default Oauth