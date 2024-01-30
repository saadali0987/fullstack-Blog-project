import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='p-3 mx-auto flex flex-col md:flex-row md:items-center max-w-3xl gap-10'>
        {/* left side */}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded px-2 py-1 text-white'>Saad's</span> Blog
          </Link>
          <p className='text-sm mt-5'>Join our community! Sign up to share your thoughts and connect with fellow bloggers.</p>
        </div>


        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='yourName123'
                id='username'
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='text'
                placeholder='name@company.com'
                id='email'
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='text'
                placeholder='Password'
                id='password'
              />
            </div>

            <Button className='text-bold text-white' gradientDuoTone="purpleToPink" type='submit' >Sign Up</Button>
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link className='text-blue-500' to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup