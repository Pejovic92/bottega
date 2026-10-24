// src/components/VideoPlayer.js
import React from 'react';

const VideoPlayer = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <video
        className="w-full border-4 border-gray-300 rounded-lg shadow-lg"
        controls
        autoPlay={false}
        loop
        muted={false}
      >
        <source src="src/assets/video.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;



//ovo se stavlja u App.jsx, za sada ne koristim ovo, ovo je samo koncept !!
{/* <div>
<h1 className=" text-center text-3xl font-bold my-8">Welcome to My Video Page</h1>
<VideoPlayer />
</div> */}