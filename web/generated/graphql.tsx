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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Avatar = {
  __typename?: 'Avatar';
  filename?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  _count: CommentCount;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  image?: Maybe<Array<CommentImages>>;
  isLiked?: Maybe<Scalars['Boolean']>;
  tweet?: Maybe<Tweet>;
  tweetId?: Maybe<Scalars['Float']>;
  user?: Maybe<User>;
  userId: Scalars['Float'];
};

export type CommentCount = {
  __typename?: 'CommentCount';
  likes?: Maybe<Scalars['Float']>;
};

export type CommentDto = {
  content?: InputMaybe<Scalars['String']>;
  tweetId: Scalars['Float'];
};

export type CommentImages = {
  __typename?: 'CommentImages';
  filename: Scalars['String'];
};

export type Count = {
  __typename?: 'Count';
  comments?: Maybe<Scalars['Float']>;
  likes?: Maybe<Scalars['Float']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type FollowCount = {
  __typename?: 'FollowCount';
  followers?: Maybe<Scalars['Float']>;
  followings?: Maybe<Scalars['Float']>;
};

export type LoginDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createTweet?: Maybe<Tweet>;
  deleteTweet: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  likeTweet: Scalars['Boolean'];
  login: ResponseDto;
  logout: Scalars['Boolean'];
  register: ResponseDto;
  removeTweetLike: Scalars['Boolean'];
  unfollowUser: Scalars['Boolean'];
  updateUser: UserResponse;
};


export type MutationCreateCommentArgs = {
  commentDto: CommentDto;
  file?: InputMaybe<Scalars['Upload']>;
};


export type MutationCreateTweetArgs = {
  file?: InputMaybe<Scalars['Upload']>;
  tweetDto?: InputMaybe<TweetDto>;
};


export type MutationDeleteTweetArgs = {
  id: Scalars['Float'];
};


export type MutationFollowUserArgs = {
  id: Scalars['Float'];
};


export type MutationLikeTweetArgs = {
  tweetId: Scalars['Float'];
};


export type MutationLoginArgs = {
  loginDto: LoginDto;
};


export type MutationRegisterArgs = {
  registerDto: UserDto;
};


export type MutationRemoveTweetLikeArgs = {
  tweetId: Scalars['Float'];
};


export type MutationUnfollowUserArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateUserArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  user: UserDto;
};

export type Query = {
  __typename?: 'Query';
  getExplore?: Maybe<Array<Tweet>>;
  getFeed?: Maybe<Array<Tweet>>;
  getLoggedInUser: User;
  getSuggestedUsers: Array<User>;
  getTweets: Tweet;
  isAuthenticated: Scalars['Boolean'];
};


export type QueryGetTweetsArgs = {
  id?: InputMaybe<Scalars['Float']>;
};

export type ResponseDto = {
  __typename?: 'ResponseDto';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<UserResponse>;
};

export type Tweet = {
  __typename?: 'Tweet';
  _count: Count;
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  image?: Maybe<Array<TweetImages>>;
  isLiked?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  userId: Scalars['Float'];
};

export type TweetDto = {
  content?: InputMaybe<Scalars['String']>;
};

export type TweetImages = {
  __typename?: 'TweetImages';
  filename: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<FollowCount>;
  avatar?: Maybe<Avatar>;
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  isFollowing?: Maybe<Scalars['Boolean']>;
  isMe?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  tweets?: Maybe<Array<Tweet>>;
  username: Scalars['String'];
};

export type UserDto = {
  bio?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  avatar?: Maybe<Avatar>;
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
};

export type CreateCommentMutationVariables = Exact<{
  file?: InputMaybe<Scalars['Upload']>;
  content: Scalars['String'];
  tweetId: Scalars['Float'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number, content: string, createdAt: any, userId: number, tweetId?: number | null, user?: { __typename?: 'User', id: number, email: string, username: string, firstName: string, lastName: string, bio?: string | null, isFollowing?: boolean | null, isMe?: boolean | null, avatar?: { __typename?: 'Avatar', filename?: string | null } | null, _count?: { __typename?: 'FollowCount', followers?: number | null, followings?: number | null } | null } | null, _count: { __typename?: 'CommentCount', likes?: number | null }, image?: Array<{ __typename?: 'CommentImages', filename: string }> | null } };

export type CreateTweetMutationVariables = Exact<{
  file?: InputMaybe<Scalars['Upload']>;
  content: Scalars['String'];
}>;


export type CreateTweetMutation = { __typename?: 'Mutation', createTweet?: { __typename?: 'Tweet', id: number, content: string, createdAt: any, user?: { __typename?: 'User', username: string, email: string } | null } | null };

export type LikeTweetMutationVariables = Exact<{
  tweetId: Scalars['Float'];
}>;


export type LikeTweetMutation = { __typename?: 'Mutation', likeTweet: boolean };

export type RemoveTweetLikeMutationVariables = Exact<{
  tweetId: Scalars['Float'];
}>;


export type RemoveTweetLikeMutation = { __typename?: 'Mutation', removeTweetLike: boolean };

export type FollowUserMutationVariables = Exact<{
  followerId: Scalars['Float'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: boolean };

export type UnfollowUserMutationVariables = Exact<{
  followerId: Scalars['Float'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'ResponseDto', user?: { __typename?: 'UserResponse', email: string, username: string, firstName: string, lastName: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message?: string | null }> | null } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'ResponseDto', user?: { __typename?: 'UserResponse', email: string, username: string, firstName: string, lastName: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message?: string | null }> | null } };

export type UpdateUserMutationVariables = Exact<{
  file?: InputMaybe<Scalars['Upload']>;
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  bio?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserResponse', username: string, email: string, firstName: string, lastName: string, bio?: string | null, avatar?: { __typename?: 'Avatar', filename?: string | null } | null } };

export type GetExploreQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExploreQuery = { __typename?: 'Query', getExplore?: Array<{ __typename?: 'Tweet', content: string, createdAt: any, id: number, isLiked?: boolean | null, image?: Array<{ __typename?: 'TweetImages', filename: string }> | null, _count: { __typename?: 'Count', likes?: number | null, comments?: number | null }, user?: { __typename?: 'User', id: number, email: string, username: string, firstName: string, lastName: string, bio?: string | null, isFollowing?: boolean | null, isMe?: boolean | null, avatar?: { __typename?: 'Avatar', filename?: string | null } | null, _count?: { __typename?: 'FollowCount', followers?: number | null, followings?: number | null } | null } | null }> | null };

export type GetFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeedQuery = { __typename?: 'Query', getFeed?: Array<{ __typename?: 'Tweet', content: string, createdAt: any, id: number, isLiked?: boolean | null, image?: Array<{ __typename?: 'TweetImages', filename: string }> | null, _count: { __typename?: 'Count', likes?: number | null, comments?: number | null }, comments?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: any, user?: { __typename?: 'User', id: number, email: string, username: string, firstName: string, lastName: string, bio?: string | null, isFollowing?: boolean | null, isMe?: boolean | null, avatar?: { __typename?: 'Avatar', filename?: string | null } | null, _count?: { __typename?: 'FollowCount', followers?: number | null, followings?: number | null } | null } | null, _count: { __typename?: 'CommentCount', likes?: number | null }, image?: Array<{ __typename?: 'CommentImages', filename: string }> | null }> | null, user?: { __typename?: 'User', id: number, email: string, username: string, firstName: string, lastName: string, bio?: string | null, isFollowing?: boolean | null, isMe?: boolean | null, avatar?: { __typename?: 'Avatar', filename?: string | null } | null, _count?: { __typename?: 'FollowCount', followers?: number | null, followings?: number | null } | null } | null }> | null };

export type GetTweetsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Float']>;
}>;


export type GetTweetsQuery = { __typename?: 'Query', getTweets: { __typename?: 'Tweet', content: string, createdAt: any, id: number, isLiked?: boolean | null, image?: Array<{ __typename?: 'TweetImages', filename: string }> | null, _count: { __typename?: 'Count', likes?: number | null, comments?: number | null }, comments?: Array<{ __typename?: 'Comment', id: number, content: string, createdAt: any, user?: { __typename?: 'User', id: number, email: string, username: string, firstName: string, lastName: string, bio?: string | null, isFollowing?: boolean | null, isMe?: boolean | null, avatar?: { __typename?: 'Avatar', filename?: string | null } | null, _count?: { __typename?: 'FollowCount', followers?: number | null, followings?: number | null } | null } | null, _count: { __typename?: 'CommentCount', likes?: number | null }, image?: Array<{ __typename?: 'CommentImages', filename: string }> | null }> | null, user?: { __typename?: 'User', id: number, email: string, username: string, firstName: string, lastName: string, bio?: string | null, isFollowing?: boolean | null, isMe?: boolean | null, avatar?: { __typename?: 'Avatar', filename?: string | null } | null, _count?: { __typename?: 'FollowCount', followers?: number | null, followings?: number | null } | null } | null } };

export type GetLoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoggedInUserQuery = { __typename?: 'Query', getLoggedInUser: { __typename?: 'User', username: string, email: string, firstName: string, lastName: string, bio?: string | null, avatar?: { __typename?: 'Avatar', filename?: string | null } | null } };

export type GetSuggestedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSuggestedUsersQuery = { __typename?: 'Query', getSuggestedUsers: Array<{ __typename?: 'User', id: number, email: string, username: string, firstName: string, lastName: string, bio?: string | null, avatar?: { __typename?: 'Avatar', filename?: string | null } | null, _count?: { __typename?: 'FollowCount', followers?: number | null, followings?: number | null } | null }> };

export type IsAuthenticatedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAuthenticatedQuery = { __typename?: 'Query', isAuthenticated: boolean };


export const CreateCommentDocument = gql`
    mutation CreateComment($file: Upload, $content: String!, $tweetId: Float!) {
  createComment(file: $file, commentDto: {content: $content, tweetId: $tweetId}) {
    id
    content
    createdAt
    userId
    user {
      id
      email
      username
      firstName
      lastName
      bio
      avatar {
        filename
      }
      _count {
        followers
        followings
      }
      isFollowing
      isMe
    }
    _count {
      likes
    }
    image {
      filename
    }
    tweetId
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      file: // value for 'file'
 *      content: // value for 'content'
 *      tweetId: // value for 'tweetId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateTweetDocument = gql`
    mutation CreateTweet($file: Upload, $content: String!) {
  createTweet(file: $file, tweetDto: {content: $content}) {
    id
    content
    createdAt
    user {
      username
      email
    }
  }
}
    `;
export type CreateTweetMutationFn = Apollo.MutationFunction<CreateTweetMutation, CreateTweetMutationVariables>;

/**
 * __useCreateTweetMutation__
 *
 * To run a mutation, you first call `useCreateTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTweetMutation, { data, loading, error }] = useCreateTweetMutation({
 *   variables: {
 *      file: // value for 'file'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateTweetMutation(baseOptions?: Apollo.MutationHookOptions<CreateTweetMutation, CreateTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTweetMutation, CreateTweetMutationVariables>(CreateTweetDocument, options);
      }
export type CreateTweetMutationHookResult = ReturnType<typeof useCreateTweetMutation>;
export type CreateTweetMutationResult = Apollo.MutationResult<CreateTweetMutation>;
export type CreateTweetMutationOptions = Apollo.BaseMutationOptions<CreateTweetMutation, CreateTweetMutationVariables>;
export const LikeTweetDocument = gql`
    mutation LikeTweet($tweetId: Float!) {
  likeTweet(tweetId: $tweetId)
}
    `;
export type LikeTweetMutationFn = Apollo.MutationFunction<LikeTweetMutation, LikeTweetMutationVariables>;

/**
 * __useLikeTweetMutation__
 *
 * To run a mutation, you first call `useLikeTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeTweetMutation, { data, loading, error }] = useLikeTweetMutation({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *   },
 * });
 */
export function useLikeTweetMutation(baseOptions?: Apollo.MutationHookOptions<LikeTweetMutation, LikeTweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeTweetMutation, LikeTweetMutationVariables>(LikeTweetDocument, options);
      }
export type LikeTweetMutationHookResult = ReturnType<typeof useLikeTweetMutation>;
export type LikeTweetMutationResult = Apollo.MutationResult<LikeTweetMutation>;
export type LikeTweetMutationOptions = Apollo.BaseMutationOptions<LikeTweetMutation, LikeTweetMutationVariables>;
export const RemoveTweetLikeDocument = gql`
    mutation RemoveTweetLike($tweetId: Float!) {
  removeTweetLike(tweetId: $tweetId)
}
    `;
export type RemoveTweetLikeMutationFn = Apollo.MutationFunction<RemoveTweetLikeMutation, RemoveTweetLikeMutationVariables>;

/**
 * __useRemoveTweetLikeMutation__
 *
 * To run a mutation, you first call `useRemoveTweetLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTweetLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTweetLikeMutation, { data, loading, error }] = useRemoveTweetLikeMutation({
 *   variables: {
 *      tweetId: // value for 'tweetId'
 *   },
 * });
 */
export function useRemoveTweetLikeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTweetLikeMutation, RemoveTweetLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTweetLikeMutation, RemoveTweetLikeMutationVariables>(RemoveTweetLikeDocument, options);
      }
export type RemoveTweetLikeMutationHookResult = ReturnType<typeof useRemoveTweetLikeMutation>;
export type RemoveTweetLikeMutationResult = Apollo.MutationResult<RemoveTweetLikeMutation>;
export type RemoveTweetLikeMutationOptions = Apollo.BaseMutationOptions<RemoveTweetLikeMutation, RemoveTweetLikeMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($followerId: Float!) {
  followUser(id: $followerId)
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      followerId: // value for 'followerId'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($followerId: Float!) {
  unfollowUser(id: $followerId)
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      followerId: // value for 'followerId'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(loginDto: {email: $email, password: $password}) {
    user {
      email
      username
      firstName
      lastName
    }
    errors {
      field
      message
    }
  }
}
    `;
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
 *      email: // value for 'email'
 *      password: // value for 'password'
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
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!, $username: String!) {
  register(
    registerDto: {email: $email, firstName: $firstName, lastName: $lastName, username: $username, password: $password}
  ) {
    user {
      email
      username
      firstName
      lastName
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($file: Upload, $lastName: String!, $firstName: String!, $bio: String, $email: String!, $username: String!) {
  updateUser(
    avatar: $file
    user: {lastName: $lastName, firstName: $firstName, bio: $bio, email: $email, username: $username}
  ) {
    username
    email
    firstName
    lastName
    bio
    avatar {
      filename
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      file: // value for 'file'
 *      lastName: // value for 'lastName'
 *      firstName: // value for 'firstName'
 *      bio: // value for 'bio'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetExploreDocument = gql`
    query GetExplore {
  getExplore {
    content
    createdAt
    id
    isLiked
    image {
      filename
    }
    _count {
      likes
      comments
    }
    user {
      id
      email
      username
      firstName
      lastName
      bio
      avatar {
        filename
      }
      _count {
        followers
        followings
      }
      isFollowing
      isMe
    }
  }
}
    `;

/**
 * __useGetExploreQuery__
 *
 * To run a query within a React component, call `useGetExploreQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExploreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExploreQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExploreQuery(baseOptions?: Apollo.QueryHookOptions<GetExploreQuery, GetExploreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExploreQuery, GetExploreQueryVariables>(GetExploreDocument, options);
      }
export function useGetExploreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExploreQuery, GetExploreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExploreQuery, GetExploreQueryVariables>(GetExploreDocument, options);
        }
export type GetExploreQueryHookResult = ReturnType<typeof useGetExploreQuery>;
export type GetExploreLazyQueryHookResult = ReturnType<typeof useGetExploreLazyQuery>;
export type GetExploreQueryResult = Apollo.QueryResult<GetExploreQuery, GetExploreQueryVariables>;
export const GetFeedDocument = gql`
    query GetFeed {
  getFeed {
    content
    createdAt
    id
    isLiked
    image {
      filename
    }
    _count {
      likes
      comments
    }
    comments {
      id
      content
      createdAt
      user {
        id
        email
        username
        firstName
        lastName
        bio
        avatar {
          filename
        }
        _count {
          followers
          followings
        }
        isFollowing
        isMe
      }
      _count {
        likes
      }
      image {
        filename
      }
    }
    user {
      id
      email
      username
      firstName
      lastName
      bio
      avatar {
        filename
      }
      _count {
        followers
        followings
      }
      isFollowing
      isMe
    }
  }
}
    `;

/**
 * __useGetFeedQuery__
 *
 * To run a query within a React component, call `useGetFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeedQuery(baseOptions?: Apollo.QueryHookOptions<GetFeedQuery, GetFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, options);
      }
export function useGetFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedQuery, GetFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, options);
        }
export type GetFeedQueryHookResult = ReturnType<typeof useGetFeedQuery>;
export type GetFeedLazyQueryHookResult = ReturnType<typeof useGetFeedLazyQuery>;
export type GetFeedQueryResult = Apollo.QueryResult<GetFeedQuery, GetFeedQueryVariables>;
export const GetTweetsDocument = gql`
    query GetTweets($userId: Float) {
  getTweets(id: $userId) {
    content
    createdAt
    id
    isLiked
    image {
      filename
    }
    _count {
      likes
      comments
    }
    comments {
      id
      content
      createdAt
      user {
        id
        email
        username
        firstName
        lastName
        bio
        avatar {
          filename
        }
        _count {
          followers
          followings
        }
        isFollowing
        isMe
      }
      _count {
        likes
      }
      image {
        filename
      }
    }
    user {
      id
      email
      username
      firstName
      lastName
      bio
      avatar {
        filename
      }
      _count {
        followers
        followings
      }
      isFollowing
      isMe
    }
  }
}
    `;

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
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetTweetsQuery(baseOptions?: Apollo.QueryHookOptions<GetTweetsQuery, GetTweetsQueryVariables>) {
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
export const GetLoggedInUserDocument = gql`
    query GetLoggedInUser {
  getLoggedInUser {
    username
    email
    firstName
    lastName
    bio
    avatar {
      filename
    }
  }
}
    `;

/**
 * __useGetLoggedInUserQuery__
 *
 * To run a query within a React component, call `useGetLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoggedInUserQuery(baseOptions?: Apollo.QueryHookOptions<GetLoggedInUserQuery, GetLoggedInUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoggedInUserQuery, GetLoggedInUserQueryVariables>(GetLoggedInUserDocument, options);
      }
export function useGetLoggedInUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoggedInUserQuery, GetLoggedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoggedInUserQuery, GetLoggedInUserQueryVariables>(GetLoggedInUserDocument, options);
        }
export type GetLoggedInUserQueryHookResult = ReturnType<typeof useGetLoggedInUserQuery>;
export type GetLoggedInUserLazyQueryHookResult = ReturnType<typeof useGetLoggedInUserLazyQuery>;
export type GetLoggedInUserQueryResult = Apollo.QueryResult<GetLoggedInUserQuery, GetLoggedInUserQueryVariables>;
export const GetSuggestedUsersDocument = gql`
    query GetSuggestedUsers {
  getSuggestedUsers {
    id
    email
    username
    firstName
    lastName
    bio
    avatar {
      filename
    }
    _count {
      followers
      followings
    }
  }
}
    `;

/**
 * __useGetSuggestedUsersQuery__
 *
 * To run a query within a React component, call `useGetSuggestedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestedUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSuggestedUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>(GetSuggestedUsersDocument, options);
      }
export function useGetSuggestedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>(GetSuggestedUsersDocument, options);
        }
export type GetSuggestedUsersQueryHookResult = ReturnType<typeof useGetSuggestedUsersQuery>;
export type GetSuggestedUsersLazyQueryHookResult = ReturnType<typeof useGetSuggestedUsersLazyQuery>;
export type GetSuggestedUsersQueryResult = Apollo.QueryResult<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>;
export const IsAuthenticatedDocument = gql`
    query IsAuthenticated {
  isAuthenticated
}
    `;

/**
 * __useIsAuthenticatedQuery__
 *
 * To run a query within a React component, call `useIsAuthenticatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsAuthenticatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsAuthenticatedQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsAuthenticatedQuery(baseOptions?: Apollo.QueryHookOptions<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>(IsAuthenticatedDocument, options);
      }
export function useIsAuthenticatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>(IsAuthenticatedDocument, options);
        }
export type IsAuthenticatedQueryHookResult = ReturnType<typeof useIsAuthenticatedQuery>;
export type IsAuthenticatedLazyQueryHookResult = ReturnType<typeof useIsAuthenticatedLazyQuery>;
export type IsAuthenticatedQueryResult = Apollo.QueryResult<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>;