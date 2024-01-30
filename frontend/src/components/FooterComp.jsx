import { Footer } from 'flowbite-react'
import React from 'react'
import {BsFacebook, BsGithub, BsTwitter, BsInstagram} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const FooterComp = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'> 
          <div className='mt-5'>
            <Link to="/" className='self-center text-lg sm:text-xl whitespace-nowrap font-semibold dark:text-white'>
              <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded px-2 py-1 text-white'>Saad's</span> Blog
            </Link>
          </div>

          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="" target='_blank' rel="noopener noreferrer">LinkedIn</Footer.Link>
              </Footer.LinkGroup>
              <Footer.LinkGroup col>
                <Footer.Link href="" target='_blank' rel="noopener noreferrer">Github</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Me" />
              <Footer.LinkGroup col>
                <Footer.Link href="" target='_blank' rel="noopener noreferrer">LinkedIn</Footer.Link>
              </Footer.LinkGroup>
              <Footer.LinkGroup col>
                <Footer.Link href="" target='_blank' rel="noopener noreferrer">Github</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="" target='_blank' rel="noopener noreferrer">Privacy Policy</Footer.Link>
              </Footer.LinkGroup>
              <Footer.LinkGroup col>
                <Footer.Link href="" target='_blank' rel="noopener noreferrer">Terms and Conditions</Footer.Link>
              </Footer.LinkGroup>
              
            </div>

          </div>
        </div>

        <Footer.Divider />
        <div className='w-full sm:flex sm:justify-between sm:items-center'>
          <Footer.Copyright href="#" by="Saad" year={new Date().getFullYear()}/>
          <div className='flex gap-6 mt-4 sm:mt-0 sm:justify-center'>
            <Footer.Icon icon={BsFacebook} />
            <Footer.Icon icon={BsInstagram} />
            <Footer.Icon icon={BsInstagram} />
            <Footer.Icon icon={BsGithub} />

          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterComp