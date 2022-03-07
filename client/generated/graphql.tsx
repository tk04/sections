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

export type Mutation = {
  __typename?: 'Mutation';
  signInWithTwitter: User;
  signUp: User;
};


export type MutationSignInWithTwitterArgs = {
  code: Scalars['String'];
};


export type MutationSignUpArgs = {
  code: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  googleId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string, name: string, email?: string | null, picture: string, googleId: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, email?: string | null, picture: string } | null };

export type TwitterAuthMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type TwitterAuthMutation = { __typename?: 'Mutation', signInWithTwitter: { __typename?: 'User', id: string, name: string, email?: string | null, picture: string } };


export const CreateUserDocument = gql`
    mutation CreateUser($code: String!) {
  signUp(code: $code) {
    id
    name
    email
    picture
    googleId
  }
}
    `;
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
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    email
    picture
  }
}
    `;

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
export const TwitterAuthDocument = gql`
    mutation TwitterAuth($code: String!) {
  signInWithTwitter(code: $code) {
    id
    name
    email
    picture
  }
}
    `;
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