import {useState} from "react";
import VisibilitySensor from "react-visibility-sensor";

const GridGallery = ({images, paid}) => {
    console.log('IMAGE RECEIVED', images);
    const [imagesShownArray, setImagesShownArray] = useState(
        Array(images.length).fill(false)
    );

    const imageVisibleChange = (index, isVisible) => {
        if (isVisible) {
            setImagesShownArray((currentImagesShownArray) => {
                currentImagesShownArray[index] = true;
                return [...currentImagesShownArray];
            });
        }
    };

    return (
        <div className="grid grid-cols-3 gap-3 ">
            {images &&
                images.map((imageUrl, index) => (
                    <VisibilitySensor
                        key={index}
                        partialVisibility={true}
                        offset={{bottom: 80, top: 80}}
                        onChange={(isVisible) => imageVisibleChange(index, isVisible)}
                    >
                        <GridGalleryCard
                            imageUrl={'https://'+imageUrl.url}
                            show={imagesShownArray[index]}
                            indexValue={index}
                            paid={paid}
                        />
                    </VisibilitySensor>
                ))}
        </div>
    );
}

const GridGalleryCard = ({imageUrl, show, indexValue, paid}) => {
    return (
        <div
            className={`relative transition ease-in duration-300 transform ${
                show ? "" : "translate-y-16 opacity-0"
            }`}
        >
            <div className="absolute inset-0  flex transition ">
                {paid == 1 ? (<div className="absolute inset-0 bg-black opacity-0"></div>) : indexValue >= 3 ? (
                    <div className="absolute inset-0 bg-black opacity-80"></div>) : null}
                {paid == 1 ? (
                    <div></div>
                ) : indexValue >= 3 ? (
                    <div className="mx-auto text-white  self-center uppercase tracking-widest text-5xl text">
                        Please purchase to see rest of the image
                    </div>
                ) : null}
            </div>
            <img src={imageUrl} alt=""/>
        </div>
    )
        ;
}
export default GridGallery
