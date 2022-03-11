"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Tweet_1 = require("../entities/Tweet");
const axios_1 = __importDefault(require("axios"));
let TweetResolver = class TweetResolver {
    async getTweet(url) {
        var _a, _b;
        try {
            const access_token = process.env.TWITTER_ACCESS_TOKEN;
            const tweetUrl = url.split("status/")[1];
            const tweetRes = await (0, axios_1.default)({
                method: "GET",
                url: `https://api.twitter.com/2/tweets/${tweetUrl}?expansions=attachments.poll_ids,attachments.media_keys,author_id&user.fields=profile_image_url,verified&tweet.fields=public_metrics&media.fields=url`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            // console.log(tweetRes.data.includes.polls[0].options);
            const pollOptions = ((_a = tweetRes.data.includes) === null || _a === void 0 ? void 0 : _a.polls) &&
                ((_b = tweetRes.data.includes) === null || _b === void 0 ? void 0 : _b.polls[0].options);
            const tweet = tweetRes.data.data;
            const { text, id, attachments, public_metrics: { like_count: likes, retweet_count: retweets, reply_count: replies, }, } = tweet;
            const user = tweetRes.data.includes.users[0];
            console.log("TWEET: ", tweetRes.data);
            console.log(tweetRes.data.includes.media);
            return {
                text,
                id,
                attachments,
                likes,
                user,
                retweets,
                replies,
                pollOptions,
                media: tweetRes.data.includes.media,
            };
        }
        catch (e) {
            console.log("ERROR: ", e.message);
            return "error";
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => Tweet_1.Tweet),
    __param(0, (0, type_graphql_1.Arg)("url")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TweetResolver.prototype, "getTweet", null);
TweetResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TweetResolver);
exports.TweetResolver = TweetResolver;
