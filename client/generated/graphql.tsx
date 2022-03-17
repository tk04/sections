import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FullUser = {
  __typename?: 'FullUser';
  email?: Maybe<Scalars['String']>;
  google: Scalars['Boolean'];
  googleId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  twitter: Scalars['Boolean'];
  twitterAccessToken?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  height?: Maybe<Scalars['Int']>;
  media_key: Scalars['String'];
  preview_image_url?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTweets: Scalars['Boolean'];
  deleteTweet: Scalars['String'];
  getTweet: Tweet;
  login: UserResponse;
  signInWithGoogle: UserResponse;
  signInWithTwitter: UserResponse;
  signup: UserResponse;
  updateMe: UserResponse;
};


export type MutationAddTweetsArgs = {
  token: Scalars['String'];
  tweetURLs: Array<Scalars['String']>;
};


export type MutationDeleteTweetArgs = {
  token: Scalars['String'];
  url: Scalars['String'];
};


export type MutationGetTweetArgs = {
  url: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignInWithGoogleArgs = {
  code: Scalars['String'];
};


export type MutationSignInWithTwitterArgs = {
  code: Scalars['String'];
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdateMeArgs = {
  input: UpdateInput;
};

export type Poll = {
  __typename?: 'Poll';
  label: Scalars['String'];
  votes: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getLandingPageTweets: Array<Tweet>;
  getMyTweets: Array<Tweet>;
  getTweets: Array<Tweet>;
  hello: Scalars['String'];
  me?: Maybe<FullUser>;
};


export type QueryGetMyTweetsArgs = {
  token: Scalars['String'];
};


export type QueryGetTweetsArgs = {
  id: Scalars['String'];
};


export type QueryMeArgs = {
  token: Scalars['String'];
};

export type SignupInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Tweet = {
  __typename?: 'Tweet';
  id: Scalars['Float'];
  likes: Scalars['Float'];
  media?: Maybe<Array<Media>>;
  pollOptions?: Maybe<Array<Poll>>;
  replies: Scalars['Float'];
  retweets: Scalars['Float'];
  text?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  user: TweetUser;
};

export type TweetUser = {
  __typename?: 'TweetUser';
  id: Scalars['Float'];
  name: Scalars['String'];
  profile_image_url: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type UserResponse = FullUser | UserError;

export type UpdateInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type TweetFragmentFragment = { __typename?: 'Tweet', id: number, url: string, likes: number, text?: string | null, retweets: number, replies: number, media?: Array<{ __typename?: 'Media', url?: string | null, preview_image_url?: string | null, type: string, width?: number | null, height?: number | null }> | null, user: { __typename?: 'TweetUser', name: string, profile_image_url: string, id: number, username: string, verified: boolean }, pollOptions?: Array<{ __typename?: 'Poll', label: string, votes: number }> | null };

export type UserErrorFragmentFragment = { __typename?: 'UserError', path: string, message: string };

export type UserFragmentFragment = { __typename?: 'FullUser', id: string, name: string, email?: string | null, picture?: string | null, twitter: boolean, google: boolean, token?: string | null };

type UserResponseFragment_FullUser_Fragment = { __typename?: 'FullUser', id: string, name: string, email?: string | null, picture?: string | null, twitter: boolean, google: boolean, token?: string | null };

type UserResponseFragment_UserError_Fragment = { __typename?: 'UserError', path: string, message: string };

export type UserResponseFragmentFragment = UserResponseFragment_FullUser_Fragment | UserResponseFragment_UserError_Fragment;

export type AddTweetsMutationVariables = Exact<{
  urls: Array<Scalars['String']> | Scalars['String'];
  token: Scalars['String'];
}>;


export type AddTweetsMutation = { __typename?: 'Mutation', addTweets: boolean };

export type DeleteTweetMutationVariables = Exact<{
  url: Scalars['String'];
  token: Scalars['String'];
}>;


export type DeleteTweetMutation = { __typename?: 'Mutation', deleteTweet: string };

export type GetTweetMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type GetTweetMutation = { __typename?: 'Mutation', getTweet: { __typename?: 'Tweet', id: number, url: string, likes: number, text?: string | null, retweets: number, replies: number, media?: Array<{ __typename?: 'Media', url?: string | null, preview_image_url?: string | null, type: string, width?: number | null, height?: number | null }> | null, user: { __typename?: 'TweetUser', name: string, profile_image_url: string, id: number, username: string, verified: boolean }, pollOptions?: Array<{ __typename?: 'Poll', label: string, votes: number }> | null } };

export type CreateUserMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', signInWithGoogle: { __typename?: 'FullUser', id: string, name: string, email?: string | null, picture?: string | null, twitter: boolean, google: boolean, token?: string | null } | { __typename?: 'UserError', path: string, message: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'FullUser', id: string, name: string, email?: string | null, picture?: string | null, twitter: boolean, google: boolean, token?: string | null } | { __typename?: 'UserError', path: string, message: string } };

export type SignUpMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signup: { __typename?: 'FullUser', id: string, name: string, email?: string | null, picture?: string | null, twitter: boolean, google: boolean, token?: string | null } | { __typename?: 'UserError', path: string, message: string } };

export type TwitterAuthMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type TwitterAuthMutation = { __typename?: 'Mutation', signInWithTwitter: { __typename?: 'FullUser', id: string, name: string, email?: string | null, picture?: string | null, twitter: boolean, google: boolean, token?: string | null } | { __typename?: 'UserError', path: string, message: string } };

export type UpdateMeMutationVariables = Exact<{
  input: UpdateInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename: 'FullUser', name: string, email?: string | null, id: string, twitter: boolean, google: boolean, picture?: string | null } | { __typename: 'UserError', path: string, message: string } };

export type GetLandingPageTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLandingPageTweetsQuery = { __typename?: 'Query', getLandingPageTweets: Array<{ __typename?: 'Tweet', id: number, url: string, likes: number, text?: string | null, retweets: number, replies: number, media?: Array<{ __typename?: 'Media', url?: string | null, preview_image_url?: string | null, type: string, width?: number | null, height?: number | null }> | null, user: { __typename?: 'TweetUser', name: string, profile_image_url: string, id: number, username: string, verified: boolean }, pollOptions?: Array<{ __typename?: 'Poll', label: string, votes: number }> | null }> };

export type GetMyTweetsQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetMyTweetsQuery = { __typename?: 'Query', getMyTweets: Array<{ __typename?: 'Tweet', id: number, url: string, likes: number, text?: string | null, retweets: number, replies: number, media?: Array<{ __typename?: 'Media', url?: string | null, preview_image_url?: string | null, type: string, width?: number | null, height?: number | null }> | null, user: { __typename?: 'TweetUser', name: string, profile_image_url: string, id: number, username: string, verified: boolean }, pollOptions?: Array<{ __typename?: 'Poll', label: string, votes: number }> | null }> };

export type GetTweetsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTweetsQuery = { __typename?: 'Query', getTweets: Array<{ __typename?: 'Tweet', id: number, url: string, likes: number, text?: string | null, retweets: number, replies: number, media?: Array<{ __typename?: 'Media', url?: string | null, preview_image_url?: string | null, type: string, width?: number | null, height?: number | null }> | null, user: { __typename?: 'TweetUser', name: string, profile_image_url: string, id: number, username: string, verified: boolean }, pollOptions?: Array<{ __typename?: 'Poll', label: string, votes: number }> | null }> };

export type MeQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'FullUser', id: string, name: string, email?: string | null, picture?: string | null, twitter: boolean, google: boolean, token?: string | null } | null };

export const TweetFragmentFragmentDoc = gql`
    fragment TweetFragment on Tweet {
  id
  url
  likes
  text
  retweets
  replies
  media {
    url
    preview_image_url
    type
    width
    height
  }
  user {
    name
    profile_image_url
    id
    username
    verified
  }
  pollOptions {
    label
    votes
  }
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on FullUser {
  id
  name
  email
  picture
  twitter
  google
  token
}
    `;
export const UserErrorFragmentFragmentDoc = gql`
    fragment UserErrorFragment on UserError {
  path
  message
}
    `;
export const UserResponseFragmentFragmentDoc = gql`
    fragment UserResponseFragment on UserResponse {
  ...UserFragment
  ...UserErrorFragment
}
    ${UserFragmentFragmentDoc}
${UserErrorFragmentFragmentDoc}`;
export const AddTweetsDocument = gql`
    mutation addTweets($urls: [String!]!, $token: String!) {
  addTweets(tweetURLs: $urls, token: $token)
}
    `;
export type AddTweetsMutationFn = Apollo.MutationFunction<AddTweetsMutation, AddTweetsMutationVariables>;

/**
 * __useAddTweetsMutation__
 *
 * To run a mutation, you first call `useAddTweetsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTweetsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTweetsMutation, { data, loading, error }] = useAddTweetsMutation({
 *   variables: {
 *      urls: // value for 'urls'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAddTweetsMutation(baseOptions?: Apollo.MutationHookOptions<AddTweetsMutation, AddTweetsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTweetsMutation, AddTweetsMutationVariables>(AddTweetsDocument, options);
      }
export type AddTweetsMutationHookResult = ReturnType<typeof useAddTweetsMutation>;
export type AddTweetsMutationResult = Apollo.MutationResult<AddTweetsMutation>;
export type AddTweetsMutationOptions = Apollo.BaseMutationOptions<AddTweetsMutation, AddTweetsMutationVariables>;
export const DeleteTweetDocument = gql`
    mutation DeleteTweet($url: String!, $token: String!) {
  deleteTweet(url: $url, token: $token)
}
    `;
export type DeleteTweetMutationFn = Apollo.MutationFunction<DeleteTweetMutation, DeleteTweetMutationVariables>;

/**
 * __useDeleteTweetMutation__
 *
 * To run a mutation, you first call `useDeleteTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTweetMutation, { data, loading, error }] = useDeleteTweetMutation({
 *   variables: {
 *      url: // value for 'url'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useDeleteTweetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTweetMutation, DeleteTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTweetMutation, DeleteTweetMutationVariables>(DeleteTweetDocument, options);
      }
export type DeleteTweetMutationHookResult = ReturnType<typeof useDeleteTweetMutation>;
export type DeleteTweetMutationResult = Apollo.MutationResult<DeleteTweetMutation>;
export type DeleteTweetMutationOptions = Apollo.BaseMutationOptions<DeleteTweetMutation, DeleteTweetMutationVariables>;
export const GetTweetDocument = gql`
    mutation getTweet($url: String!) {
  getTweet(url: $url) {
    ...TweetFragment
  }
}
    ${TweetFragmentFragmentDoc}`;
export type GetTweetMutationFn = Apollo.MutationFunction<GetTweetMutation, GetTweetMutationVariables>;

/**
 * __useGetTweetMutation__
 *
 * To run a mutation, you first call `useGetTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getTweetMutation, { data, loading, error }] = useGetTweetMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetTweetMutation(baseOptions?: Apollo.MutationHookOptions<GetTweetMutation, GetTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetTweetMutation, GetTweetMutationVariables>(GetTweetDocument, options);
      }
export type GetTweetMutationHookResult = ReturnType<typeof useGetTweetMutation>;
export type GetTweetMutationResult = Apollo.MutationResult<GetTweetMutation>;
export type GetTweetMutationOptions = Apollo.BaseMutationOptions<GetTweetMutation, GetTweetMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($code: String!) {
  signInWithGoogle(code: $code) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignupInput!) {
  signup(input: $input) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const TwitterAuthDocument = gql`
    mutation TwitterAuth($code: String!) {
  signInWithTwitter(code: $code) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;
export type TwitterAuthMutationFn = Apollo.MutationFunction<TwitterAuthMutation, TwitterAuthMutationVariables>;

/**
 * __useTwitterAuthMutation__
 *
 * To run a mutation, you first call `useTwitterAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTwitterAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [twitterAuthMutation, { data, loading, error }] = useTwitterAuthMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useTwitterAuthMutation(baseOptions?: Apollo.MutationHookOptions<TwitterAuthMutation, TwitterAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TwitterAuthMutation, TwitterAuthMutationVariables>(TwitterAuthDocument, options);
      }
export type TwitterAuthMutationHookResult = ReturnType<typeof useTwitterAuthMutation>;
export type TwitterAuthMutationResult = Apollo.MutationResult<TwitterAuthMutation>;
export type TwitterAuthMutationOptions = Apollo.BaseMutationOptions<TwitterAuthMutation, TwitterAuthMutationVariables>;
export const UpdateMeDocument = gql`
    mutation UpdateMe($input: updateInput!) {
  updateMe(input: $input) {
    __typename
    ... on FullUser {
      name
      email
      id
      twitter
      google
      picture
    }
    ... on UserError {
      path
      message
    }
  }
}
    `;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const GetLandingPageTweetsDocument = gql`
    query GetLandingPageTweets {
  getLandingPageTweets {
    ...TweetFragment
  }
}
    ${TweetFragmentFragmentDoc}`;

/**
 * __useGetLandingPageTweetsQuery__
 *
 * To run a query within a React component, call `useGetLandingPageTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLandingPageTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLandingPageTweetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLandingPageTweetsQuery(baseOptions?: Apollo.QueryHookOptions<GetLandingPageTweetsQuery, GetLandingPageTweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLandingPageTweetsQuery, GetLandingPageTweetsQueryVariables>(GetLandingPageTweetsDocument, options);
      }
export function useGetLandingPageTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLandingPageTweetsQuery, GetLandingPageTweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLandingPageTweetsQuery, GetLandingPageTweetsQueryVariables>(GetLandingPageTweetsDocument, options);
        }
export type GetLandingPageTweetsQueryHookResult = ReturnType<typeof useGetLandingPageTweetsQuery>;
export type GetLandingPageTweetsLazyQueryHookResult = ReturnType<typeof useGetLandingPageTweetsLazyQuery>;
export type GetLandingPageTweetsQueryResult = Apollo.QueryResult<GetLandingPageTweetsQuery, GetLandingPageTweetsQueryVariables>;
export const GetMyTweetsDocument = gql`
    query GetMyTweets($token: String!) {
  getMyTweets(token: $token) {
    ...TweetFragment
  }
}
    ${TweetFragmentFragmentDoc}`;

/**
 * __useGetMyTweetsQuery__
 *
 * To run a query within a React component, call `useGetMyTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTweetsQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetMyTweetsQuery(baseOptions: Apollo.QueryHookOptions<GetMyTweetsQuery, GetMyTweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTweetsQuery, GetMyTweetsQueryVariables>(GetMyTweetsDocument, options);
      }
export function useGetMyTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTweetsQuery, GetMyTweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTweetsQuery, GetMyTweetsQueryVariables>(GetMyTweetsDocument, options);
        }
export type GetMyTweetsQueryHookResult = ReturnType<typeof useGetMyTweetsQuery>;
export type GetMyTweetsLazyQueryHookResult = ReturnType<typeof useGetMyTweetsLazyQuery>;
export type GetMyTweetsQueryResult = Apollo.QueryResult<GetMyTweetsQuery, GetMyTweetsQueryVariables>;
export const GetTweetsDocument = gql`
    query GetTweets($id: String!) {
  getTweets(id: $id) {
    ...TweetFragment
  }
}
    ${TweetFragmentFragmentDoc}`;

/**
 * __useGetTweetsQuery__
 *
 * To run a query within a React component, call `useGetTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTweetsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTweetsQuery(baseOptions: Apollo.QueryHookOptions<GetTweetsQuery, GetTweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTweetsQuery, GetTweetsQueryVariables>(GetTweetsDocument, options);
      }
export function useGetTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTweetsQuery, GetTweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTweetsQuery, GetTweetsQueryVariables>(GetTweetsDocument, options);
        }
export type GetTweetsQueryHookResult = ReturnType<typeof useGetTweetsQuery>;
export type GetTweetsLazyQueryHookResult = ReturnType<typeof useGetTweetsLazyQuery>;
export type GetTweetsQueryResult = Apollo.QueryResult<GetTweetsQuery, GetTweetsQueryVariables>;
export const MeDocument = gql`
    query Me($token: String!) {
  me(token: $token) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useMeQuery(baseOptions: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;