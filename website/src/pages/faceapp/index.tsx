import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
const Faceapp = () => {
  const data = [
    "https://www.smiletherapy.com",
    "https://open.spotify.com/playlist/37i9dQZF1DX9XIFQuFvzM4?si=f1b023ff5c944674",
    "https://youtu.be/sl_c1kd7aFw?si=YEK54zXwV6sFulx9",
    "https://youtu.be/SA6zaQwSz1g",
    "https://www.youtube.com/watch?v=KLuTLF3x9sA",
    "https://www.youtube.com/watch?v=8_sXAZRN5HA",
    "https://www.youtube.com/watch?v=tYf0BoFe9D8",
    "https://www.youtube.com/watch?v=e9vrwKUDM7w",
    "https://open.spotify.com/playlist/37i9dQZF1DX3lmpQSniUBH?si=bf13f6cb2d29478c",
    "https://open.spotify.com/playlist/1r4hnyOWexSvylLokn2hUa?si=QMtWRsnKRYSlSYjdBVm8Zg&pi=a-yTQON6PkR5SG",
    "https://www.youtube.com/watch?v=BHACKCNDMW8",
    "https://www.netflix.com/title/81727155",
    "https://www.youtube.com/watch?v=bFD55oPkf8U",
    "https://www.youtube.com/watch?v=K7hYf0yIK5w",
    "https://open.spotify.com/album/4d9DM076MAyeFs51Ul18C1",
    "https://www.youtube.com/watch?v=7KIdmCnYztY&pp=ygUdY29tZWR5IG1vdmllIHNjZW5lcyBtYWxheWFsYW0%3D",
    "https://www.youtube.com/watch?v=x1HRxMGgFkk&pp=ygUdY29tZWR5IG1vdmllIHNjZW5lcyBtYWxheWFsYW0%3D"
  ];
  var dict = {
    Angry: "😡",
    Disgust: "🤢",
    Fear: "😱",
    Happy: "😊",
    Sad: "😞",
    Surprise: "😲",
    Neutral: "😐",
    NoFace:"😑"
    
  };

  const [face, setFace] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [urlselect, SetUrlSelect] = useState("/");
  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFileChange1(event);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      axios
        //  ip change
        .post("http://192.168.1.36:5000/upload1", formData)
        .then((response) => {
          // Image uploaded successfully
          console.log(response["data"]["result"]);
          setFace(response["data"]["result"]);
          // SetUrlSelect(data[3])
        })
        .catch((error) => {
          console.log("error");
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Additional form submission handling can be done here, if needed
  };
  return (
    <div
      className="relative bg-[url]"
      style={{
        backgroundImage: "url(image/faceappbg.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-transparent h-5 py-8 rounded-full">
        <div className="flex items-center justify-between px-4">
          <Link href="/">
            <button className="text-white focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          </Link>
          <h1 className="text-4xl font-bold text-rose-600 text-center">
            EMO-BUDDY
          </h1>
          <div></div>{" "}
          {/* Add any additional content you need on the right side */}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form
          className="max-w-md w-full rounded-lg shadow-lg p-6 bg-white"
          // style={{ background: "transparent" }}
          action="/upload"
          method="post"
        >
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Upload a face image:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="text-center mt-4">
              {face ? (
                <button className="px-6 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-opacity-50">
                  {face+ "    " + dict[face] }
                </button>
              ) : (
                // <p className="text-xl text-green-500">{face}</p>
                <p className="text-xl text-red-500"></p>
              )}
            </div>
            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected Image"
                height={200}
                width={200}
              />
            )}
          </div>
          <div className="flex justify-center">  
          {face ? (
  <p className="px-6 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-opacity-50">

    {face === "Sad" ? (
      <a href={[data[2], data[1],data[0]][Math.floor(Math.random() * 3)]}> Click Here </a>
    ) : face === "Disgust" ? (
      <a href={[data[9], data[2],data[10]][Math.floor(Math.random() * 3)]}> Click Here </a>
    ) : face === "Happy"   ? (
      <a href={[data[2], data[1],data[8]][Math.floor(Math.random() * 3)]}> Click Here </a>
    ) : face === "Neutral" ? (
      <a href={[data[5], data[1],data[11]][Math.floor(Math.random() * 3)]}> Click Here </a>)
      : face === "Surprise" ? (
      <a href={[data[6], data[7],data[12]][Math.floor(Math.random() * 3)]}> Click Here </a>)
      : face === "Fear" ? (
        <a href={[data[4],data[0],data[13]][Math.floor(Math.random() * 3)]}> Click Here </a>)
      : face === "Angry" ? (
          <a href={[data[14],data[15],data[16]][Math.floor(Math.random() * 3)]}> Click Here </a>)
      : face === "noface"  ? (
      <>No Face Detected 😑</>
    ) : (
      <a href={data[0]}> Click here </a>
    )}
  </p>
) : (
  <></>
)}

         </div>
        </form>
        {/* <button
          className="md:hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline fixed bottom-4 left-4 right-4 z-10"
          type="submit"
        >
          Scan
        </button> */}
      </div>
    </div>
  );
};

export default Faceapp;
