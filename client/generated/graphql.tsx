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

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  media_key: Scalars['String'];
  preview_image_url?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  signInWithGoogle: UserResponse;
  signInWithTwitter: UserResponse;
  signup: UserResponse;
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

export type Poll = {
  __typename?: 'Poll';
  label: Scalars['String'];
  votes: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getTweet: Tweet;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryGetTweetArgs = {
  url: Scalars['String'];
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
  text: Scalars['String'];
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

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  twitterAccessToken?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type UserResponse = User | UserError;

export type UserErrorFragmentFragment = { __typename?: 'UserError', path: string, message: string };

export type UserFragmentFragment = { __typename?: 'User', id: string, name: string, email?: string | null, picture?: string | null };

type UserResponseFragment_User_Fragment = { __typename?: 'User', id: string, name: string, email?: string | null, picture?: string | null };

type UserResponseFragment_UserError_Fragment = { __typename?: 'UserError', path: string, message: string };

export type UserResponseFragmentFragment = UserResponseFragment_User_Fragment | UserResponseFragment_UserError_Fragment;

export type CreateUserMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', signInWithGoogle: { __typename?: 'User', id: string, name: string, email?: string | null, picture?: string | null } | { __typename?: 'UserError', path: string, message: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: string, name: string, email?: string | null, picture?: string | null } | { __typename?: 'UserError', path: string, message: string } };

export type SignUpMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', id: string, name: string, email?: string | null, picture?: string | null } | { __typename?: 'UserError', path: string, message: string } };

export type TwitterAuthMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type TwitterAuthMutation = { __typename?: 'Mutation', signInWithTwitter: { __typename?: 'User', id: string, name: string, email?: string | null, picture?: string | null } | { __typename?: 'UserError', path: string, message: string } };

export type GetTweetQueryVariables = Exact<{
  url: Scalars['String'];
}>;


export type GetTweetQuery = { __typename?: 'Query', getTweet: { __typename?: 'Tweet', likes: number, text: string, media?: Array<{ __typename?: 'Media', url?: string | null, preview_image_url?: string | null, type: string }> | null, user: { __typename?: 'TweetUser', name: string, profile_image_url: string, id: number, username: string, verified: boolean } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, email?: string | null, picture?: string | null } | null };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  name
  email
  picture
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
export const GetTweetDocument = gql`
    query getTweet($url: String!) {
  getTweet(url: $url) {
    likes
    text
    media {
      url
      preview_image_url
      type
    }
    user {
      name
      profile_image_url
      id
      username
      verified
    }
  }
}
    `;

/**
 * __useGetTweetQuery__
 *
 * To run a query within a React component, call `useGetTweetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTweetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTweetQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetTweetQuery(baseOptions: Apollo.QueryHookOptions<GetTweetQuery, GetTweetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTweetQuery, GetTweetQueryVariables>(GetTweetDocument, options);
      }
export function useGetTweetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTweetQuery, GetTweetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTweetQuery, GetTweetQueryVariables>(GetTweetDocument, options);
        }
export type GetTweetQueryHookResult = ReturnType<typeof useGetTweetQuery>;
export type GetTweetLazyQueryHookResult = ReturnType<typeof useGetTweetLazyQuery>;
export type GetTweetQueryResult = Apollo.QueryResult<GetTweetQuery, GetTweetQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
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
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
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