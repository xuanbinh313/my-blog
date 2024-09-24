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

export type BlockProject = {
  __typename?: 'BlockProject';
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  value: Scalars['ID']['output'];
};

export type Blog = {
  __typename?: 'Blog';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  published: Scalars['Boolean']['output'];
  slug: Scalars['ID']['output'];
  tags: Array<Tag>;
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

export type HeroProject = {
  __typename?: 'HeroProject';
  content: Scalars['String']['output'];
  image: Scalars['String']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['ID']['output'];
};

export type InputBlog = {
  content: Scalars['String']['input'];
  image: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlog: Blog;
  updateBlog: Blog;
};


export type MutationCreateBlogArgs = {
  blog: InputBlog;
};


export type MutationUpdateBlogArgs = {
  blog: InputBlog;
  slug: Scalars['String']['input'];
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

export type Project = {
  __typename?: 'Project';
  blocks: Array<BlockProject>;
  createdDate: Scalars['String']['output'];
  hero: HeroProject;
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
  project?: Maybe<Project>;
  projects: Array<Project>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
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


export type QueryProjectArgs = {
  slug: Scalars['String']['input'];
};


export type QueryTagArgs = {
  slug: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  slug: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};


export const GetBlogsDocument = gql`
    query getBlogs {
  blogs {
    image
    title
    slug
    content
    tags {
      slug
      title
    }
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
      slug
      title
    }
    published
  }
}
    `;
export const CreateBlogDocument = gql`
    mutation createBlog($blog: InputBlog!) {
  createBlog(blog: $blog) {
    title
    content
    image
    tags {
      slug
      title
    }
  }
}
    `;
export const UpdateBlogDocument = gql`
    mutation updateBlog($slug: String!, $blog: InputBlog!) {
  updateBlog(slug: $slug, blog: $blog) {
    title
    content
    image
    tags {
      slug
      title
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
export const GetProjectDocument = gql`
    query getProject($slug: String!) {
  project(slug: $slug) {
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
export const GetTagsDocument = gql`
    query getTags {
  tags {
    id
    slug
    title
    image
    content
  }
}
    `;
export const GetTagDocument = gql`
    query getTag($slug: String!) {
  tag(slug: $slug) {
    id
    slug
    title
    image
    content
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
    createBlog(variables: CreateBlogMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateBlogMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateBlogMutation>(CreateBlogDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createBlog', 'mutation', variables);
    },
    updateBlog(variables: UpdateBlogMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateBlogMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateBlogMutation>(UpdateBlogDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateBlog', 'mutation', variables);
    },
    getHeaders(variables?: GetHeadersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetHeadersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHeadersQuery>(GetHeadersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHeaders', 'query', variables);
    },
    getPage(variables: GetPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPageQuery>(GetPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPage', 'query', variables);
    },
    getProject(variables: GetProjectQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProjectQuery>(GetProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProject', 'query', variables);
    },
    getDogs(variables?: GetDogsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetDogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDogsQuery>(GetDogsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDogs', 'query', variables);
    },
    dogByName(variables: DogByNameQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DogByNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DogByNameQuery>(DogByNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'dogByName', 'query', variables);
    },
    getTags(variables?: GetTagsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagsQuery>(GetTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTags', 'query', variables);
    },
    getTag(variables: GetTagQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTagQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagQuery>(GetTagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTag', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type GetBlogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlogsQuery = { __typename?: 'Query', blogs: Array<{ __typename?: 'Blog', image: string, title: string, slug: string, content: string, tags: Array<{ __typename?: 'Tag', slug: string, title: string }> }> };

export type BlogBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type BlogBySlugQuery = { __typename?: 'Query', blog?: { __typename?: 'Blog', slug: string, title: string, content: string, image: string, published: boolean, tags: Array<{ __typename?: 'Tag', slug: string, title: string }> } | null };

export type CreateBlogMutationVariables = Exact<{
  blog: InputBlog;
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createBlog: { __typename?: 'Blog', title: string, content: string, image: string, tags: Array<{ __typename?: 'Tag', slug: string, title: string }> } };

export type UpdateBlogMutationVariables = Exact<{
  slug: Scalars['String']['input'];
  blog: InputBlog;
}>;


export type UpdateBlogMutation = { __typename?: 'Mutation', updateBlog: { __typename?: 'Blog', title: string, content: string, image: string, tags: Array<{ __typename?: 'Tag', slug: string, title: string }> } };

export type GetHeadersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHeadersQuery = { __typename?: 'Query', headers: Array<{ __typename?: 'HeaderItem', slug: string, name: string }> };

export type GetPageQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetPageQuery = { __typename?: 'Query', page?: { __typename?: 'Page', slug: string, title: string, hero: { __typename?: 'Hero', type: string, image: string, title: string, subtitle: string, content: string }, blocks: Array<{ __typename?: 'Block', name: string, value: string, type: string }> } | null };

export type GetProjectQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', slug: string, title: string, hero: { __typename?: 'HeroProject', type: string, image: string, title: string, subtitle: string, content: string }, blocks: Array<{ __typename?: 'BlockProject', name: string, value: string, type: string }> } | null };

export type GetDogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDogsQuery = { __typename?: 'Query', dogs: Array<{ __typename?: 'Dog', name: string, breed: string, ageInWeeks: number, image: string, sex: string, weight: number, fee: number }> };

export type DogByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type DogByNameQuery = { __typename?: 'Query', dog?: { __typename?: 'Dog', name: string, breed: string, ageInWeeks: number, image: string, sex: string, description: Array<string>, color: string, attributes: Array<{ __typename?: 'DogAttribute', key: string, value: string }> } | null };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, slug: string, title: string, image: string, content: string }> };

export type GetTagQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetTagQuery = { __typename?: 'Query', tag?: { __typename?: 'Tag', id: string, slug: string, title: string, image: string, content: string } | null };
