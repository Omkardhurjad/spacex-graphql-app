"use client";

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_LAUNCH_BY_ID } from '@/app/queries/launches';
import Link from 'next/link';

const LaunchDetail = () => {
  const { id } = useParams();
  console.log("Launch ID:", id);

  if (!id) return <p>Loading...</p>;

  const { loading, error, data } = useQuery(GET_LAUNCH_BY_ID, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const launch = data?.launch;

  if (!launch) return <p>Launch not found</p>;

  
  const youtubeVideoId = launch.links.video_link?.includes('youtube.com')
    ? new URLSearchParams(new URL(launch.links.video_link).search).get('v')
    : null;

  return (
    <div className="container mx-auto p-6 md:p-10 fade-slide-in">
     
      <div className="mb-6">
        <Link href="/" legacyBehavior>
          <a className="inline-flex items-center text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-md shadow-lg hover:bg-gradient-to-l transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back to Home</span>
          </a>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 fade-slide-in">
        {/* Mission Patch */}
        {launch.links.mission_patch && (
          <div className="flex justify-center mb-8">
            <img
              src={launch.links.mission_patch}
              alt={`${launch.mission_name} Mission Patch`}
              className="w-32 h-32 md:w-48 md:h-48 rounded-md border-2 border-gray-300 shadow-lg transform hover:scale-105 transition duration-300"
            />
          </div>
        )}

        {/* Mission Name */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900">
          {launch.mission_name}
        </h1>

        {/* Rocket Name */}
        <p className="text-lg text-gray-600 text-center mb-2">
          Rocket: <span className="font-semibold text-gray-800">{launch.rocket.rocket_name}</span>
        </p>

        {/* Launch Date */}
        <p className="text-md text-gray-500 text-center mb-6">
          Launch Date: <span className="font-semibold">{new Date(launch.launch_date_local).toLocaleDateString()}</span>
        </p>

        {/* YouTube Video Embed (if available) */}
        {youtubeVideoId ? (
          <div className="mb-6 fade-slide-in">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full rounded-lg shadow-lg border-2 border-gray-300"
            ></iframe>
          </div>
        ) : (
         
          launch.links.video_link && (
            <a
              href={launch.links.video_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-blue-600 hover:underline mb-6"
            >
              Watch Launch Video
            </a>
          )
        )}

        
        <div className="text-center fade-slide-in">
          <p className="text-gray-700">For more details, check out the video or follow SpaceX for more information.</p>
        </div>
      </div>
    </div>
  );
};

export default LaunchDetail;
