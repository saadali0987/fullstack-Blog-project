import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill out all fields")
    }
    else {
      try {
        setLoading(true)
        setErrorMessage(null)
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        const data = await res.json()
        if(data.success === "false")
        {
          return setErrorMessage(data.message)
        }
        setLoading(false)
        if(res.ok)
        {
          navigate('/signin')
        }
      } catch (err) {
        setErrorMessage(err.message)
        setLoading(false)
      }
    }

  }




  return (
    <div className='min-h-screen mt-20'>
      <div className='p-3 mx-auto flex flex-col md:flex-row md:items-center max-w-3xl gap-10'>
        {/* left side */}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded px-2 py-1 text-white'>Saad's</span> <span className='border-b-black border-b-2'>Blog</span>
          </Link>
          <p className='text-sm mt-5'>Join our community! Sign up to share your thoughts and connect with fellow bloggers.</p>
        </div>


        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='yourName123'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>

            <Button disabled={loading} className='text-bold text-white' gradientDuoTone="purpleToPink" type='submit' >
              {loading ? (
                <div>
                  <Spinner size="sm"/>  
                  <span className='pl-3'>Loading...</span>
                </div>
                
              ) : 'Sign Up'}
            </Button>
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link className='text-blue-500' to="/signin">Sign In</Link>
          </div>

          {errorMessage && (
            <Alert className='mt-5' color="failure">{errorMessage}</Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default Signup