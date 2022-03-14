import React from "react";
import Image from "next/image";
import { Tweet, TweetFragmentFragment } from "../generated/graphql";
import { FiHeart } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
interface TweetProps {
  tweet: TweetFragmentFragment;
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  return (
    <div className="max-w-sm">
      <br />
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
          <h2>{tweet.user.name}</h2>
          <p className=" text-gray-400">@{tweet.user.username}</p>
        </div>
      </div>
      <h1>{tweet.text.split("https://t.co")[0]}</h1>

      {tweet.media && (
        <>
          {tweet.media.length == 1 ? (
            <div
              className="mt-3 grid grid-cols-1 grid-rows-1 grid-flow-col-dense"
              style={{
                position: "relative",
                // minHeight: "200px",
                height: `${tweet.media[0].height}`,

                width: `${tweet.media[0].width}`,
              }}
            >
              {tweet.media[0].height! > 400 ? (
                <Image
                  src={tweet.media[0].url!}
                  alt="media"
                  width={tweet.media[0].width!}
                  height={
                    tweet.media[0].height! > 1100
                      ? 1100
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
            </div>
          ) : tweet.media.length == 3 ? (
            <div
              className=" grid grid-cols-[60%_40%]  grid-rows-1 grid-flow-row-dense space-y-[1.5px] space-x-2 mt-3"
              style={{
                width: "100%",
                height: "300px",
                maxHeight: "500px",
                position: "relative",
              }}
            >
              {tweet.media.map((media) => (
                <section
                  className="relative"
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
                      // width={100}
                      alt="media"
                      // height={}
                      layout="fill"
                      className="rounded-lg"
                      // layout="responsive"
                      objectFit="none"
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
          ) : (
            <div
              className={`grid grid-cols-2 grid-flow-row-dense space-y-[1.5px] mt-3 ${
                tweet.media.length == 2 && "space-x-2"
              }`}
              style={{
                width: "100%",
                height: `${tweet.media.length == 2 ? "200px" : "500px"}`,
                position: "relative",
              }}
            >
              {tweet.media.map((media) => (
                <section
                  className="relative"
                  key={media.url}
                  style={{
                    width: "100%",
                    height: "fit",
                    margin: "200rem",
                    // position: "relative",
                  }}
                >
                  {media.url ? (
                    <Image
                      src={media.url}
                      // width={100}
                      alt="media"
                      // height={}
                      layout="fill"
                      className="rounded-lg"
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
          )}
        </>
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
