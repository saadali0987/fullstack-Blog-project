import { FileInput, Select, TextInput, Button, Alert } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreatePost = () => {
    const [file, setFile] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [formData, setFormData] = useState({})

    const handleUploadImage = async()=>{
        try{
            if(!file)
            {
                setImageUploadError("Please select an image first!")
                return
            }
            setImageUploadError(null)
            const storage = getStorage(app)
            const filename = new Date().getTime() + "-" + file.name
            const storageRef = ref(storage, filename)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setImageUploadProgress(progress.toFixed(0))
                },
                (error)=>{
                    setImageUploadError("Upload failed, Please try again")
                    setImageUploadProgress(null)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>{
                        setImageUploadError(null)
                        setImageUploadProgress(null)
                        setFormData({...formData, image: downloadUrl})
                        console.log("upload")
                    })
                }
            )
        }catch(err)
        {
            setImageUploadError("Image upload failed, please try again")
            setImageUploadProgress(null)
        }
    }
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
                <FileInput type='file' accept='image/*' sizing="sm" onChange={(e)=>setFile(e.target.files[0])} />
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                    {imageUploadProgress ? (
                        <div className='w-16 h-16'>
                            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%` } />
                        </div>
                    ) : "Upload"}
                </Button>
            </div>
            {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
            {formData.image && <img src={formData.image} alt="upload" className='w-full h-72 object-contain        ' />}
            <ReactQuill required theme="snow" placeholder='Write something...' className='h-64 mb-10' />
            <Button type="submit" gradientDuoTone='purpleToPink'>Publish</Button>
        </form>
    </div>
  )
}

export default CreatePost