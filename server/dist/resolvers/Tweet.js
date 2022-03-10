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
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("../middleware/auth");
let TweetResolver = class TweetResolver {
    async getTweet(url, { req }) {
        try {
            const access_token = req.user.twitterAccessToken;
            const tweetUrl = url.split("status/")[1];
            const tweet = await (0, axios_1.default)({
                method: "GET",
                url: `https://api.twitter.com/2/tweets/${tweetUrl}?expansions=attachments.poll_ids,attachments.media_keys,author_id&user.fields=profile_image_url,verified`,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            // const tweet = await axios.post(
            //   `https://api.twitter.com/2/tweets/${tweetUrl}`,
            //   {},
            //   { headers: { Authorization: `Bearer ${access_token}` } }
            // );
            // console.log(tweet.data);
            console.log(tweet.data.includes);
            return "TWEET IN CONSOLE";
        }
        catch (e) {
            console.log(e);
            return "error";
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    (0, type_graphql_1.UseMiddleware)(auth_1.auth),
    __param(0, (0, type_graphql_1.Arg)("url")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TweetResolver.prototype, "getTweet", null);
TweetResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TweetResolver);
exports.TweetResolver = TweetResolver;
