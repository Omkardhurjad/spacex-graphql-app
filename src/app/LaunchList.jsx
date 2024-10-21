"use client";

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GET_LAUNCHES } from '@/app/queries/launches';
import Link from 'next/link';

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);
  const [allLaunches, setAllLaunches] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState('mission_name');
  const [filterOption, setFilterOption] = useState('');

  const { loading, error, data, fetchMore } = useQuery(GET_LAUNCHES, {
    variables: { limit: 10, offset: 0 },
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (data) {
      setLaunches(data.launchesPast);
      setAllLaunches(data.launchesPast);
    }
  }, [data]);

  const handleSort = (option) => {
    setSortOption(option);
    const sortedLaunches = [...launches].sort((a, b) => {
      if (option === 'launch_date_local') {
        return new Date(a.launch_date_local) - new Date(b.launch_date_local);
      }
      return a[option].localeCompare(b[option]);
    });
    setLaunches(sortedLaunches);
  };

  const handleFilter = (searchTerm) => {
    setFilterOption(searchTerm);

    if (searchTerm) {
      const filteredLaunches = allLaunches.filter((launch) =>
        launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setLaunches(filteredLaunches);
      setHasMore(false);
    } else {
      setLaunches(allLaunches);
      setHasMore(true);
    }
  };

  const fetchMoreLaunches = async () => {
    const { data: newLaunches } = await fetchMore({
      variables: {
        offset: launches.length,
      },
    });
    if (newLaunches.launchesPast.length === 0) {
      setHasMore(false);
    } else {
      setAllLaunches((prev) => [...prev, ...newLaunches.launchesPast]);
      setLaunches((prev) => [...prev, ...newLaunches.launchesPast]);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="spinner"></div> 
    </div>
  );

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <label className="mr-2">Sort by:</label>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="border rounded-md p-2 bg-white text-black"
          >
            <option className="text-black" value="mission_name">Mission Name</option>
            <option className="text-black" value="launch_date_local">Launch Date</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Search by Mission Name:</label>
          <input
            type="text"
            placeholder="Enter mission name"
            value={filterOption}
            onChange={(e) => handleFilter(e.target.value)}
            className="border rounded-md p-2 bg-white"
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={launches.length}
        next={hasMore ? fetchMoreLaunches : null}
        hasMore={hasMore}
        loader={<h4 className="text-center">Loading more launches...</h4>}
        endMessage={<p className="text-center">No more launches to display.</p>}
      >
        {launches.map((launch) => (
          <div
            key={launch.id}
            className="launch-card border rounded-md shadow-lg p-6 mb-6 mx-2 bg-gradient-to-r from-blue-500 to-purple-600 transition duration-300 ease-out transform hover:scale-105 hover:shadow-2xl fade-in"
          >
            {/* Mission Name */}
            <h3 className="text-3xl text-center font-bold text-white mb-2">
              {launch.mission_name}
            </h3>
            
            {/* Rocket Name */}
            <p className="text-white text-center">
              Rocket: {launch.rocket.rocket_name}
            </p>
            
            {/* Launch Date */}
            <p className="text-white text-center mb-4">
              Date: {new Date(launch.launch_date_local).toLocaleDateString()}
            </p>

            {/* View Details Button */}
            <Link href={`/launches/${launch.id}`} legacyBehavior>
              <a className="mt-2 inline-block bg-white text-black font-semibold px-6 py-3 border border-gray-300 rounded-full hover:bg-black hover:text-white transition duration-300">
                View Details
              </a>
            </Link>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default LaunchList;
