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
  itemIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  items: Array<Inventory>;
  parentId?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
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
  inventory: Array<Inventory>;
  inventoryByCategory?: Maybe<Array<Inventory>>;
  inventoryById?: Maybe<Inventory>;
  inventoryByName: Inventory;
  order?: Maybe<Order>;
  ordersByUser?: Maybe<Array<Maybe<Order>>>;
  profile: User;
};


export type QueryInventoryByCategoryArgs = {
  category: Scalars['String']['input'];
};


export type QueryInventoryByIdArgs = {
  id: Scalars['String']['input'];
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

export type GetAllItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllItemsQuery = { __typename?: 'Query', inventory: Array<{ __typename?: 'Inventory', id: string, name: string, description: string, price: number, quantity: number, category?: string | null, image?: string | null, createdAt: any, updatedAt: any }> };

export type GetInventoryQueryVariables = Exact<{
  inventoryByIdId: Scalars['String']['input'];
}>;


export type GetInventoryQuery = { __typename?: 'Query', inventoryById?: { __typename?: 'Inventory', id: string, name: string, description: string, price: number, quantity: number, image?: string | null, category?: string | null, misc?: string | null, createdAt: any, updatedAt: any } | null };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder?: { __typename?: 'Order', id: string, userId: string, itemIds?: Array<string | null> | null, quantity?: Array<number | null> | null, status: OrderStatus } | null };

export type GetOrdersByUserIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOrdersByUserIdQuery = { __typename?: 'Query', ordersByUser?: Array<{ __typename?: 'Order', id: string, userId: string, address: string, itemIds?: Array<string | null> | null, status: OrderStatus, quantity?: Array<number | null> | null, items: Array<{ __typename?: 'Inventory', id: string, name: string, image?: string | null, description: string, price: number }> } | null> | null };


export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"exp"}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const RefreshTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"exp"}}]}}]}}]} as unknown as DocumentNode<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const GetAllItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllItemsQuery, GetAllItemsQueryVariables>;
export const GetInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inventoryByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventoryById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inventoryByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"misc"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetInventoryQuery, GetInventoryQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"itemIds"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const GetOrdersByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOrdersByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ordersByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"itemIds"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]} as unknown as DocumentNode<GetOrdersByUserIdQuery, GetOrdersByUserIdQueryVariables>;