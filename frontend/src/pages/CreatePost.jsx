import { FileInput, Select, TextInput, Button, Alert } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom'

const CreatePost = () => {
    const [file, setFile] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [formData, setFormData] = useState({})
    const [imageUrl, setImageUrl] = useState(null)
    const [publishError, setPublishError] = useState(null)
    const navigate = useNavigate()

    console.log(formData)


    const handleSelectImage = (event)=>{
        setImageUploadProgress(null)
        setFile(event.target.files[0])
        const url = URL.createObjectURL(event.target.files[0])
        setImageUrl(url)
        console.log(url)
    }

    const handleUploadImage = async()=>{
        setImageUploadProgress(null)
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


    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await fetch("/api/post/create", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if(!res.ok)
            {
                setPublishError(data.message)
            }else{
                setPublishError(null)
                navigate(`/post/${data.slug}`)
            }
        }catch(err)
        {
            setPublishError("Something went wrong")
        }
    }
  return (
    <div className='max-w-3xl min-h-screen p-3 mx-auto'>
        <h1 className='text-center text-2xl mb-4 mt-2 font-semibold'>Create A Post</h1>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput onChange={(e)=>setFormData({...formData, title:e.target.value})} type='text' placeholder='Title' required id='title' className='flex-1' />
                <Select onChange={(e)=>setFormData({...formData, category: e.target.value})}>
                    <option value='uncategorized'>Select a category</option>
                    <option value='React'>React.js</option>
                    <option value='javascript'>Javascript</option>
                    <option value='mongodb'>Mongodb</option>
                    <option value='node'>Node.js</option>
                    <option value='others'>Other</option>
                </Select>
            </div>

            <div className='p-3 flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted'>
                <FileInput type='file' accept='image/*' sizing="sm" onChange={handleSelectImage} />
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                    {imageUploadProgress ? (
                        <div className='w-16 h-16'>
                            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%` }  styles={{
                        path: {
                            stroke: imageUploadProgress == 100 ? 'green' : `rgba(62, 152, 199, ${imageUploadProgress / 100})`
                        }
                    }}/>
                        </div>
                    ) : "Save"}
                </Button>
            </div>
            {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
            {imageUrl && <img src={imageUrl} alt="upload" className='w-full h-72 object-cover        ' />}
            <ReactQuill onChange={(value)=>setFormData({...formData, content:value})} required theme="snow" placeholder='Write something...' className='h-64 mb-10' />
            <Button type="submit" gradientDuoTone='purpleToPink'>Publish</Button>
            {publishError && <Alert color="failure">{publishError}</Alert>}
        </form>
    </div>
  )
}

export default CreatePost