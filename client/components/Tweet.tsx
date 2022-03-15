import Image from "next/image";
import React from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { TweetFragmentFragment } from "../generated/graphql";
interface TweetProps {
  tweet: TweetFragmentFragment;
  clickEvent?: (id: number) => void;
}

const Tweet: React.FC<TweetProps> = ({ tweet, clickEvent }) => {
  const totalVotes =
    tweet.pollOptions &&
    tweet.pollOptions.reduce((acc, cur) => acc + cur.votes, 0);

  const tweetHandler = () => {
    window.open(tweet.url);
  };
  return (
    <div
      className={`max-w-[300px] p-3 cursor-pointer hover:bg-gray-50 rounded-xg"`}
      style={{
        width: "300px",
        minWidth: "300px",
      }}
      onClick={clickEvent ? clickEvent.bind(null, tweet.id) : tweetHandler}
    >
      <div className="flex space-x-2 mb-2">
        <Image
          src={tweet.user.profile_image_url}
          className="rounded-full"
          alt="profile"
          width={45}
          height={45}
          layout="fixed"
          priority
        />
        <div className="flex flex-col space-y-0">
          <div className="flex space-x-2 items-center">
            <h2>{tweet.user.name}</h2>
            {tweet.user.verified && <BsFillPatchCheckFill />}
          </div>
          <p className=" text-gray-400">@{tweet.user.username}</p>
        </div>
      </div>
      <h1>{tweet.text!.split("https://t.co")[0]}</h1>

      {tweet.media && (
        <div>
          {tweet.media.length == 3 ? (
            <div
              className=" grid grid-cols-[50%_50%] grid-rows-2 grid-flow-row-dense space-y-2 mt-3"
              style={{
                width: "100%",
                height: "300px",
                maxHeight: "500px",
                position: "relative",
              }}
            >
              {tweet.media.map((media, idx) => (
                <section
                  className={`relative ${idx == 1 && "col-span-2"} `}
                  key={media.url}
                  style={{
                    width: "100%",
                    height: "fit",
                    position: "relative",
                  }}
                >
                  {media.url ? (
                    <Image
                      src={media.url}
                      // width={200}
                      // height={idx == 1 ? "300" : "100"}
                      alt="media"
                      // height={}
                      layout="fill"
                      className={`rounded-lg `}
                      // layout="responsive"
                      objectFit="cover"
                      priority
                    />
                  ) : (
                    media.preview_image_url && (
                      <Image
                        src={media.preview_image_url}
                        alt="media"
                        layout="fill"
                        priority
                      />
                    )
                  )}
                </section>
              ))}
            </div>
          ) : tweet.media.length == 4 ? (
            <div
              className="grid grid-cols-[50%_50%] grid-rows-2 grid-flow-row-dense mt-3 gap-1"
              style={{
                // width: "100%",
                // height: "400px",
                // maxHeight: "500px",
                position: "relative",
              }}
            >
              {tweet.media.map((media, idx) => (
                <section
                  className={`relative col-span-1 row-span-1 pr-1`}
                  key={media.url}
                  style={{
                    width: "100%",
                    height: "fit",
                    position: "relative",
                  }}
                >
                  {media.url ? (
                    <Image
                      src={media.url}
                      alt=""
                      height={200}
                      width={200}
                      // layout="fill"
                      className={`rounded-lg `}
                      // layout="responsive"
                      objectFit="cover"
                      priority
                    />
                  ) : (
                    media.preview_image_url && (
                      <Image
                        src={media.preview_image_url}
                        alt="media"
                        layout="fill"
                        priority
                      />
                    )
                  )}
                  {idx == 1 && <br />}
                </section>
              ))}
            </div>
          ) : tweet.media.length == 2 ? (
            <div className="grid grid-cols-2 grid-rows-1">
              {tweet.media.map((media) => (
                <div key={media.url} className="mr-2">
                  <Image
                    src={media.url!}
                    width={200}
                    alt=""
                    height={240}
                    className="rounded-lg"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            tweet.media.length == 1 && (
              <div
                className="mt-3 grid grid-cols-1 grid-rows-1 grid-flow-col-dense"
                style={{
                  position: "relative",
                  minHeight: "200px",
                  height: `${tweet.media[0].height}`,
                  width: `${tweet.media[0].width}`,
                }}
              >
                {tweet.media[0].type == "photo" ? (
                  <>
                    {tweet.media[0].height! > 400 ? (
                      <Image
                        src={tweet.media[0].url!}
                        alt="media"
                        width={tweet.media[0].width!}
                        height={
                          tweet.media[0].height! > 1600
                            ? 1600
                            : tweet.media[0].height!
                        }
                        className="rounded-lg"
                        objectFit="cover"
                        priority
                      />
                    ) : (
                      <Image
                        src={tweet.media[0].url!}
                        alt="media"
                        // width={tweet.media[0].width!}
                        // height={tweet.media[0].height!}
                        className="rounded-lg"
                        objectFit="cover"
                        priority
                        layout="fill"
                      />
                    )}
                  </>
                ) : (
                  <>
                    {tweet.media[0].preview_image_url && (
                      <Image
                        src={tweet.media[0].preview_image_url}
                        alt="media"
                        // width={tweet.media[0].width!}
                        // height={tweet.media[0].height!}
                        className="rounded-lg"
                        objectFit="cover"
                        priority
                        layout="fill"
                      />
                    )}
                  </>
                )}
              </div>
            )
          )}
        </div>
      )}
      {tweet.pollOptions && tweet.pollOptions.length > 0 && (
        <div className=" space-y-3 mt-3">
          {tweet.pollOptions.map((poll, idx) => (
            <div
              key={idx}
              className=" bg-slate-100 rounded-xl p-2 px-5 text-gray-600"
            >
              <div className="flex justify-between">
                <p>{poll.label}</p>
                <p className="text-gray-500">
                  {((poll.votes / totalVotes!) * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 flex flex-row w-full place-content-evenly">
        <section className="flex items-center mr-2 space-x-1">
          <FiHeart size={18} className="text-red-400" />
          <p className="text-gray-500"> {tweet.likes}</p>
        </section>
        <section className="flex items-center mr-2 space-x-1">
          <AiOutlineRetweet size={18} className="text-slate-400" />
          <p>{tweet.retweets}</p>
        </section>
        <section className="flex items-center mr-2 space-x-1">
          <FaRegComment size={18} className="text-gray-400" />
          <p> {tweet.replies}</p>
        </section>
      </div>
    </div>
  );
};

export default Tweet;
