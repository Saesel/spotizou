import { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import { Skeleton } from "../Skeleton";

import { fetchUserTopItems } from "../../services/fetchUserTopItems";
import { Footer } from "../../components/Footer";

export function Tracks() {
  const [timeRange, setTimeRange] = useState("long_term");
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserTopItems("tracks", timeRange).then((data) => {
      setTracks(data.items);
      setIsLoading(false);
    });
  }, [timeRange]);

  const handleClickRedirectToTrack = (id) => {
    window.open(tracks[id].external_urls.spotify);
  };

  return (
    <>
      <Header />
      <section className="m-auto mb-8 flex max-w-[1200px] flex-col">
        <h1 className="mb-8 mt-12 text-center font-serif text-4xl">Tracks</h1>
        <select
          className="m-auto mb-8 block w-[200px] border-b-2 border-gray-500 bg-transparent py-1 text-center text-sm font-semibold text-gray-500 focus:border-indigo-600 focus:text-indigo-500 focus:outline-none"
          onChange={(event) => {
            setTimeRange(event.target.value);
          }}
        >
          <option value="long_term">All Time</option>
          <option value="medium_term">Last 6 Months</option>
          <option value="short_term">Last 4 Weeks</option>
        </select>
        {isLoading ? (
          <Skeleton />
        ) : (
          <ul className="m-auto flex w-full flex-col flex-nowrap items-start justify-center gap-4 p-4 sm:flex-row sm:flex-wrap sm:gap-8 sm:p-0 xl:justify-between">
            {tracks.map(({ id, album, name, artists }, index) => (
              <li
                key={id}
                className="m-auto flex w-full items-center gap-4 sm:mx-0 sm:w-[200px] sm:flex-col sm:items-start sm:justify-start sm:gap-0"
              >
                <div className="flex min-w-[64px] justify-center overflow-hidden rounded-lg shadow-md sm:flex sm:w-[200px]">
                  <img
                    loading="lazy"
                    className="max-h-[64px] max-w-full cursor-pointer object-cover transition-all duration-200 ease-in-out hover:scale-110 sm:max-h-[200px]"
                    src={album.images[0].url}
                    alt={name}
                    title={name}
                    onClick={() => {
                      handleClickRedirectToTrack(index);
                    }}
                  />
                </div>
                <div className="flex w-full flex-col justify-start sm:mt-2">
                  <div className="mt-1 flex w-[200px] items-center gap-2 sm:w-full">
                    <p className="text-[0.9rem]">{index + 1}.</p>
                    <p
                      className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-[0.9rem] font-semibold hover:underline"
                      title={name}
                      onClick={() => {
                        handleClickRedirectToTrack(index);
                      }}
                    >
                      {name}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">{artists[0].name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />
    </>
  );
}
