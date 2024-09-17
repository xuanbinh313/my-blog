import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Block = {
  __typename?: 'Block';
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  value: Scalars['ID']['output'];
};

export type Blog = {
  __typename?: 'Blog';
  author: Scalars['String']['output'];
  content: Array<Scalars['String']['output']>;
  image: Scalars['String']['output'];
  published: Scalars['String']['output'];
  slug: Scalars['ID']['output'];
  tags: Array<TagAttribute>;
  title: Scalars['String']['output'];
};

export type Dog = {
  __typename?: 'Dog';
  ageInWeeks: Scalars['Float']['output'];
  attributes: Array<DogAttribute>;
  availableDate: Scalars['String']['output'];
  breed: Scalars['String']['output'];
  color: Scalars['String']['output'];
  description: Array<Scalars['String']['output']>;
  fee: Scalars['Float']['output'];
  image: Scalars['String']['output'];
  name: Scalars['ID']['output'];
  sex: Scalars['String']['output'];
  weight: Scalars['Float']['output'];
};

export type DogAttribute = {
  __typename?: 'DogAttribute';
  key: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type HeaderItem = {
  __typename?: 'HeaderItem';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['ID']['output'];
};

export type Hero = {
  __typename?: 'Hero';
  content: Scalars['String']['output'];
  image: Scalars['String']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['ID']['output'];
};

export type Page = {
  __typename?: 'Page';
  blocks: Array<Block>;
  createdDate: Scalars['String']['output'];
  hero: Hero;
  id: Scalars['ID']['output'];
  published: Scalars['Boolean']['output'];
  slug: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedDate: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  blog?: Maybe<Blog>;
  blogs: Array<Blog>;
  dog?: Maybe<Dog>;
  dogs: Array<Dog>;
  headers: Array<HeaderItem>;
  page?: Maybe<Page>;
  pages: Array<Page>;
};


export type QueryBlogArgs = {
  slug: Scalars['String']['input'];
};


export type QueryDogArgs = {
  name: Scalars['String']['input'];
};


export type QueryPageArgs = {
  slug: Scalars['String']['input'];
};

export type TagAttribute = {
  __typename?: 'TagAttribute';
  key: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};


export const GetBlogsDocument = gql`
    query getBlogs {
  blogs {
    title
    slug
    tags {
      key
      value
    }
    author
    published
  }
}
    `;
export const BlogBySlugDocument = gql`
    query blogBySlug($slug: String!) {
  blog(slug: $slug) {
    slug
    title
    content
    image
    tags {
      key
      value
    }
  }
}
    `;
export const GetHeadersDocument = gql`
    query getHeaders {
  headers {
    slug
    name
  }
}
    `;
export const GetPageDocument = gql`
    query getPage($slug: String!) {
  page(slug: $slug) {
    slug
    title
    hero {
      type
      image
      title
      subtitle
      content
    }
    blocks {
      name
      value
      type
    }
  }
}
    `;
export const GetDogsDocument = gql`
    query getDogs {
  dogs {
    name
    breed
    ageInWeeks
    image
    sex
    weight
    fee
  }
}
    `;
export const DogByNameDocument = gql`
    query dogByName($name: String!) {
  dog(name: $name) {
    name
    breed
    ageInWeeks
    image
    sex
    description
    color
    attributes {
      key
      value
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getBlogs(variables?: GetBlogsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetBlogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBlogsQuery>(GetBlogsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlogs', 'query', variables);
    },
    blogBySlug(variables: BlogBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BlogBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogBySlugQuery>(BlogBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'blogBySlug', 'query', variables);
    },
    getHeaders(variables?: GetHeadersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetHeadersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHeadersQuery>(GetHeadersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHeaders', 'query', variables);
    },
    getPage(variables: GetPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPageQuery>(GetPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPage', 'query', variables);
    },
    getDogs(variables?: GetDogsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetDogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDogsQuery>(GetDogsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDogs', 'query', variables);
    },
    dogByName(variables: DogByNameQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DogByNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DogByNameQuery>(DogByNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'dogByName', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type GetBlogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlogsQuery = { __typename?: 'Query', blogs: Array<{ __typename?: 'Blog', title: string, slug: string, author: string, published: string, tags: Array<{ __typename?: 'TagAttribute', key: string, value: string }> }> };

export type BlogBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type BlogBySlugQuery = { __typename?: 'Query', blog?: { __typename?: 'Blog', slug: string, title: string, content: Array<string>, image: string, tags: Array<{ __typename?: 'TagAttribute', key: string, value: string }> } | null };

export type GetHeadersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHeadersQuery = { __typename?: 'Query', headers: Array<{ __typename?: 'HeaderItem', slug: string, name: string }> };

export type GetPageQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetPageQuery = { __typename?: 'Query', page?: { __typename?: 'Page', slug: string, title: string, hero: { __typename?: 'Hero', type: string, image: string, title: string, subtitle: string, content: string }, blocks: Array<{ __typename?: 'Block', name: string, value: string, type: string }> } | null };

export type GetDogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDogsQuery = { __typename?: 'Query', dogs: Array<{ __typename?: 'Dog', name: string, breed: string, ageInWeeks: number, image: string, sex: string, weight: number, fee: number }> };

export type DogByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type DogByNameQuery = { __typename?: 'Query', dog?: { __typename?: 'Dog', name: string, breed: string, ageInWeeks: number, image: string, sex: string, description: Array<string>, color: string, attributes: Array<{ __typename?: 'DogAttribute', key: string, value: string }> } | null };
