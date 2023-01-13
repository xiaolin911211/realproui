import React, {useState} from "react";
import {
    Modal,
} from "flowbite-react";
import {HttpMediaUpload} from "../../components/api/RequestAPI";


const OrderDetailStaffPage = () => {

    const [img, setImg] = useState([]);
    const [imgFile, setImgFile] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [videoURL, setVideoURL] = useState();
    console.log('videoURL',videoURL);
    const onImageChange = (e) => {

        const fileArray = [];
        const fileUploadArray = []
        for (let i = 0; i < e.target.files.length; i++) {
            img.push({'name': e.target.files[i].name, 'url': URL.createObjectURL(e.target.files[i])});
        }
        for (let i = 0; i < img.length; i++) {
            fileArray.push({'name': img[i].name, 'url': img[i].url});
        }
        //file upload
        for (let i = 0; i < e.target.files.length; i++) {
            console.log('loop file:',e.target.files[i])
            imgFile.push(e.target.files[i]);
        }
        for (let i = 0; i < imgFile.length; i++) {
            fileUploadArray.push(imgFile[i]);
        }
        setImg(fileArray);
        setImgFile(fileUploadArray);

    };


    const removeImageHandler = (e) => {
        console.log('Remove Item', e);
        const removedImage = img.filter(item => item.name != e);
        const removedFileImage = imgFile.filter(item =>item.name != e);
        setImg(removedImage);
        setImgFile(removedFileImage);
    };

    const uploadImage = async (e) => {
        console.log('uploadImage: ', img);
        const mediaUploadResponse = await HttpMediaUpload('160622-5769-0004', '2A7F0541BF9BDEBCA7E723B', '1', imgFile, videoURL);
        console.log('mediaUploadResponse: ', mediaUploadResponse);

    };

    return (
        <section>
            <div className="p-5">


                <div className="flex justify-center items-center w-full">
                    <label htmlFor="dropzone-file"
                           className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                className="font-semibold">Click to upload</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={onImageChange}
                               multiple={true}/>
                    </label>

                </div>
                <div className="mb-6">
                    <br/>
                    <label htmlFor="base-input"
                           className="block mb-2 text-sm font-medium text-gray-900 ">Video URL</label>
                    <input type="text" id="base-input"
                           value={videoURL}
                           onChange={(e)=> setVideoURL(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {(img).map(url => (
                        <div className="relative ...">
                            <img className="object-bottom h-90 w-full ..." src={url.url}/>
                            <p></p>

                            <button className={"absolute top-0 right-0"} onClick={(e) => (removeImageHandler(url.name))}
                                    type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor" strokeWidth="6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>


            </div>

            <div className="flex p-2 mt-4">
                <a
                    href={"../orderhistory"}
                    className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                >
                    Cancel
                </a>
                <div className="flex-auto flex flex-row-reverse">
                    <button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="text-white dark:bg-gray-600 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    >
                        Submit
                    </button>
                </div>
            </div>

            <Modal show={isOpen} size="md" popup onClose={() => setOpen(false)}>
                <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                    <div className="p-6 text-center">
                        <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none"
                             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want
                            to upload these files, once updated you will not be able to edit</h3>
                        <button data-modal-toggle="popup-modal" type="button"
                                onClick={uploadImage}
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Yes, I'm sure
                        </button>
                        <button data-modal-toggle="popup-modal" type="button"
                                onClick={() => setOpen(false)}
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No,
                            cancel
                        </button>
                    </div>
                </Modal.Body>
            </Modal>


        </section>
    )
}
export default OrderDetailStaffPage