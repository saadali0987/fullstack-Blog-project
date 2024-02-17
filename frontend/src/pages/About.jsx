import React from 'react'

const About = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>About Saad's Blog</h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Saad's Blog. Hi, my name is Saad Ali. I am a passionate web developer and I love to write about Technology, coding and everything in between. This is one of my personal projects. I hope you like it😊
            </p>
              This project has been created using the best practices in MERN stack. For styling, tailwind.css and flowbite has been used. Firebase cloud storage is responsible for saving file data. Additionaly I have used redux for state management.
            <p>

            </p>

            <p>

            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About