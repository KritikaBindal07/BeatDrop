import { openUploadWidget } from "../../utils/CloudinaryService";
// import { cloudinary_upload_preset } from "../../config";

const CloudinaryUpload = ({ setUrl, setName, label = "Select File" }) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dnkekexcx",
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
        } else {
          if (error) {
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button
      className="bg-white text-black rounded-md p-3 font-semibold"
      onClick={uploadImageWidget}
    >
      {label}
    </button>
  );
};

export default CloudinaryUpload;
