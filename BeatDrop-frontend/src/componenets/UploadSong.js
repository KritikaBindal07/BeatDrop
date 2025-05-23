import React, { useState, useEffect } from "react";

import IconText from "./shared/Icontext";
import { Icon } from "@iconify/react";
import TextWithHover from "./shared/Textwithhover";
import TextInput from "./shared/TextInput";
import CloudinaryUpload from "./shared/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/serviceHelpers";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");
  const [description, setDescription] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();

  const [songDuration, setSongDuration] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const calculateDuration = async () => {
      if (playlistUrl) {
        try {
          const audioContext = new AudioContext();
          const response = await fetch(playlistUrl);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          const duration = audioBuffer.duration;
          setSongDuration(duration);
        } catch (error) {
          console.error("Error calculating song duration:", error);
        }
      }
    };

    calculateDuration();
  }, [playlistUrl]);

  const submitSong = async () => {
    if (!songDuration) {
      alert("Please upload a song file to calculate the duration.");
      return;
    }
    const data = {
      name,
      thumbnail,
      track: playlistUrl,
      description,
      duration: songDuration,
    };
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    console.log(response);
    if (response.err) {
      alert("Could not create song");
      setName = "";
      setDescription = "";
      setThumbnail = "";
      setSongDuration = "";

      return;
    } else {
      alert("Success");
      navigate("/loggedinhome");
    }
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <LoggedInContainer currentActiveScreen={"uploadsong"}>
      <div className="flex flex-col gap-4 h-full">
        <div className="text-2xl font-semibold mb-5 text-white mt-8">
          Upload your Music
        </div>
        <div className="w-full flex gap-4 justify-center flex-wrap flex-col sm:flex-row">
          <div className="w-full sm:w-1/3">
            {" "}
            <TextInput
              label="Name"
              labelClassName="text-white"
              placeholder="Name"
              value={name}
              setValue={setName}
            ></TextInput>
          </div>
          {/* <div className="w-1/3">
            {" "}
            <TextInput
              label="Thumbnail"
              labelClassName="text-white"
              placeholder="Thumbnail"
              value={thumbnail}
              setValue={setThumbnail}
            ></TextInput>
          </div> */}

          <div className="w-full sm:w-1/3">
            <TextInput
              label="Description"
              labelClassName="text-white"
              placeholder="Description"
              value={description}
              setValue={setDescription}
            ></TextInput>
          </div>
          {/* <div className="w-1/3">
            <TextInput
              label="Duration"
              labelClassName="text-white"
              placeholder="Duration"
              value={formatDuration(songDuration)}
              // setValue={setSongDuration}
              // disabled={true}
              readOnly
            ></TextInput>
          </div> */}
        </div>
        <div className="w-full flex flex-col justify-center gap-6 md:gap-12 py-7 md:flex-row">
          <div className="mx-auto md:mx-0">
            {uploadedSongFileName ? (
              <div className="bg-white px-3 py-1 rounded-md">
                {uploadedSongFileName.substring(0, 25)}...
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylistUrl}
                setName={setUploadedSongFileName}
                label="Select Track"
              ></CloudinaryUpload>
            )}
          </div>

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
        </div>

        <div className="w-full flex justify-center items-center">
          {" "}
          <div
            className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
            onClick={submitSong}
          >
            Submit Song
          </div>
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default UploadSong;
