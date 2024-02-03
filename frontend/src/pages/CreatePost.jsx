import { FileInput, Select, TextInput, Button } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='max-w-3xl min-h-screen p-3 mx-auto'>
        <h1 className='text-center text-2xl mb-4 mt-2 font-semibold'>Create A Post</h1>

        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
                <Select>
                    <option value='uncategorized'>Select a category</option>
                    <option value='React'>React.js</option>
                    <option value='javascript'>Javascript</option>
                    <option value='mongodb'>Mongodb</option>
                    <option value='node'>Node.js</option>
                    <option value='others'>Other</option>
                </Select>
            </div>

            <div className='p-3 flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted'>
                <FileInput type='file' accept='image/*' sizing="sm" />
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload Image</Button>
            </div>
            <ReactQuill required theme="snow" placeholder='Write something...' className='h-64 mb-10' />
            <Button type="submit" gradientDuoTone='purpleToPink'>Publish</Button>
        </form>
    </div>
  )
}

export default CreatePost