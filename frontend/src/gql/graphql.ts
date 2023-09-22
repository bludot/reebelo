/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AccessToken = {
  __typename?: 'AccessToken';
  exp: Scalars['Date']['output'];
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type CreateInventoryInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  misc?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateOrderInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  itemId?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};

export type DeleteOrderInput = {
  id: Scalars['String']['input'];
};

export type Inventory = {
  __typename?: 'Inventory';
  category?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  misc?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createInventory: Inventory;
  createOrder?: Maybe<Order>;
  deleteInventory: Inventory;
  deleteOrder?: Maybe<Order>;
  refreshToken: AccessToken;
  register: Scalars['Boolean']['output'];
  signIn: AccessToken;
  updateInventory: Inventory;
  updateInventoryQuantity: Inventory;
  updateOrder?: Maybe<Order>;
  updateOrderStatus?: Maybe<Order>;
};


export type MutationCreateInventoryArgs = {
  input: CreateInventoryInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationDeleteInventoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOrderArgs = {
  input: DeleteOrderInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input?: InputMaybe<RegisterInput>;
};


export type MutationSignInArgs = {
  input?: InputMaybe<SignInInput>;
};


export type MutationUpdateInventoryArgs = {
  input: UpdateInventoryInput;
};


export type MutationUpdateInventoryQuantityArgs = {
  input: UpdateInventoryQuantityInput;
};


export type MutationUpdateOrderArgs = {
  input: UpdateOrderInput;
};


export type MutationUpdateOrderStatusArgs = {
  input: UpdateOrderStatusInput;
};

export type Order = {
  __typename?: 'Order';
  address: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  itemIds: Array<Scalars['String']['output']>;
  items: Array<Inventory>;
  parentId?: Maybe<Scalars['String']['output']>;
  quantity: Array<Scalars['Int']['output']>;
  status: OrderStatus;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
  userId: Scalars['String']['output'];
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Created = 'CREATED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING'
}

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  inventory?: Maybe<Inventory>;
  inventoryByCategory?: Maybe<Array<Inventory>>;
  inventoryByName: Inventory;
  order?: Maybe<Order>;
  ordersByUser?: Maybe<Array<Maybe<Order>>>;
  profile: User;
};


export type QueryInventoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryInventoryByCategoryArgs = {
  category: Scalars['String']['input'];
};


export type QueryInventoryByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrdersByUserArgs = {
  userId: Scalars['String']['input'];
};

export type RegisterInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignInInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UpdateInventoryInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  misc?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateInventoryQuantityInput = {
  id: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type UpdateOrderInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOrderStatusInput = {
  id: Scalars['String']['input'];
  status: OrderStatus;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  uid: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AccessToken', token: string, refreshToken: string, exp: any } };

export type RefreshTokensMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokensMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AccessToken', token: string, refreshToken: string, exp: any } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, username: string, uid: string } };


export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"exp"}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const RefreshTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"exp"}}]}}]}}]} as unknown as DocumentNode<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;