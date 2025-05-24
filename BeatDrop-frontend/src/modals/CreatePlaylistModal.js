import { useState } from "react";
import TextInput from "../componenets/shared/TextInput";
import { makeAuthenticatedPOSTRequest } from "../utils/serviceHelpers";
import CloudinaryUpload from "./../componenets/shared/CloudinaryUpload";

const CreatePlaylistModal = ({ closeModal }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");
  const apiBaseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

  const createPlaylist = async () => {
    try {
      const response = await makeAuthenticatedPOSTRequest(`${apiBaseUrl}/playlist/create`, {
        name: playlistName,
        thumbnail: thumbnail,
        songs: [],
      });

      if (response.error) {
        if (response.error === "Playlist name already exists") {
          alert("Playlist name already exists");
        } else {
          alert("Error: " + response.error);
        }
      } else {
        alert("Playlist successfully created");
        if (response._id) {
          closeModal();
        }
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-app-black w-full mx-5 sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-md p-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-white mb-5 font-semibold text-lg">
          Create Playlist
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <TextInput
            label="Name"
            labelClassName={"text-white"}
            placeholder="Playlist Name"
            value={playlistName}
            setValue={setPlaylistName}
          />
          {/* <TextInput
            label="Thumbnail"
            labelClassName={"text-white"}
            placeholder="Thumbnail"
            value={playlistThumbnail}
            setValue={setPlaylistThumbnail}
          /> */}
          <div className="mx-auto md:mx-0 ">
            {thumbnail ? (
              <div>
                <img
                  src={thumbnail}
                  alt="thumbnail"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <div className="text-white text-sm truncate">
                  {thumbnailName}
                </div>
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setThumbnail}
                setName={setThumbnailName}
                label="Upload Thumbnail"
                resourceType="image"
              />
            )}
          </div>

          <div
            className="bg-white w-full sm:w-1/2 rounded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer"
            onClick={createPlaylist}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
