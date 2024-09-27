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
  ID: { input: number; output: number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Block = {
  __typename?: 'Block';
  endpoint: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
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
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  published: Scalars['Boolean']['output'];
  publishedAt?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type HeaderItem = {
  __typename?: 'HeaderItem';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type Hero = {
  __typename?: 'Hero';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
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
  published?: Scalars['Boolean']['input'];
  slug: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  tags: Array<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
};

export type InputPage = {
  blocks: Array<Scalars['Float']['input']>;
  heroId: Scalars['ID']['input'];
  published?: Scalars['Boolean']['input'];
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type InputTag = {
  content: Scalars['String']['input'];
  image: Scalars['String']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlog: Blog;
  createPage: ResponseBase;
  createTag: ResponseTag;
  updateBlog: ResponseBase;
  updateTag: ResponseTag;
};


export type MutationCreateBlogArgs = {
  blog: InputBlog;
};


export type MutationCreatePageArgs = {
  payload: InputPage;
};


export type MutationCreateTagArgs = {
  payload: InputTag;
};


export type MutationUpdateBlogArgs = {
  blog: InputBlog;
  slug: Scalars['String']['input'];
};


export type MutationUpdateTagArgs = {
  id: Scalars['ID']['input'];
  payload: InputTag;
};

export type Page = {
  __typename?: 'Page';
  blocks: Array<Block>;
  createdDate: Scalars['String']['output'];
  hero: Hero;
  id: Scalars['ID']['output'];
  published: Scalars['Boolean']['output'];
  publishedAt?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedDate?: Maybe<Scalars['String']['output']>;
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
  blogsAdmin: Array<Blog>;
  getBlock?: Maybe<Block>;
  getBlocks: Array<Block>;
  getHeros: Array<Hero>;
  getPages: Array<Page>;
  getTags: Array<Tag>;
  headers: Array<HeaderItem>;
  hero?: Maybe<Hero>;
  page?: Maybe<Page>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  tag?: Maybe<Tag>;
};


export type QueryBlogArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetBlockArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHeroArgs = {
  type: Scalars['String']['input'];
};


export type QueryPageArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProjectArgs = {
  slug: Scalars['String']['input'];
};


export type QueryTagArgs = {
  id: Scalars['ID']['input'];
};

export type ResponseBase = {
  __typename?: 'ResponseBase';
  success: Scalars['Boolean']['output'];
};

export type ResponseTag = {
  __typename?: 'ResponseTag';
  success: Scalars['Boolean']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  link?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


export const GetBlocksDocument = gql`
    query getBlocks {
  getBlocks {
    id
    type
    title
    endpoint
  }
}
    `;
export const GetBlockDocument = gql`
    query getBlock($id: ID!) {
  getBlock(id: $id) {
    id
    type
    title
    endpoint
  }
}
    `;
export const GetBlogsDocument = gql`
    query getBlogs {
  blogs {
    image
    title
    slug
    summary
    publishedAt
    tags {
      slug
      title
    }
  }
}
    `;
export const GetBlogsAdminDocument = gql`
    query getBlogsAdmin {
  blogsAdmin {
    image
    title
    slug
    summary
    publishedAt
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
    summary
    content
    image
    tags {
      id
      slug
      title
    }
    published
    publishedAt
  }
}
    `;
export const CreateBlogDocument = gql`
    mutation createBlog($blog: InputBlog!) {
  createBlog(blog: $blog) {
    title
    summary
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
export const UpdateBlogDocument = gql`
    mutation updateBlog($slug: String!, $blog: InputBlog!) {
  updateBlog(slug: $slug, blog: $blog) {
    success
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
export const GetHerosDocument = gql`
    query getHeros {
  getHeros {
    id
    type
    image
    title
    subtitle
    content
  }
}
    `;
export const GetPagesDocument = gql`
    query getPages {
  getPages {
    id
    slug
    title
  }
}
    `;
export const GetPageDocument = gql`
    query getPage($slug: String!) {
  page(slug: $slug) {
    id
    slug
    title
    hero {
      id
      type
      image
      title
      subtitle
      content
    }
    blocks {
      id
      title
      type
      endpoint
    }
  }
}
    `;
export const CreatePageDocument = gql`
    mutation createPage($payload: InputPage!) {
  createPage(payload: $payload) {
    success
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
export const GetTagsDocument = gql`
    query getTags {
  getTags {
    id
    slug
    title
    image
    content
  }
}
    `;
export const GetTagByIdDocument = gql`
    query getTagById($id: ID!) {
  tag(id: $id) {
    id
    slug
    title
    content
    image
    link
  }
}
    `;
export const UpdateTagDocument = gql`
    mutation updateTag($id: ID!, $payload: InputTag!) {
  updateTag(id: $id, payload: $payload) {
    success
  }
}
    `;
export const CreateTagDocument = gql`
    mutation createTag($payload: InputTag!) {
  createTag(payload: $payload) {
    success
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getBlocks(variables?: GetBlocksQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetBlocksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBlocksQuery>(GetBlocksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlocks', 'query', variables);
    },
    getBlock(variables: GetBlockQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetBlockQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBlockQuery>(GetBlockDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlock', 'query', variables);
    },
    getBlogs(variables?: GetBlogsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetBlogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBlogsQuery>(GetBlogsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlogs', 'query', variables);
    },
    getBlogsAdmin(variables?: GetBlogsAdminQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetBlogsAdminQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBlogsAdminQuery>(GetBlogsAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlogsAdmin', 'query', variables);
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
    getHeros(variables?: GetHerosQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetHerosQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHerosQuery>(GetHerosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHeros', 'query', variables);
    },
    getPages(variables?: GetPagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPagesQuery>(GetPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPages', 'query', variables);
    },
    getPage(variables: GetPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPageQuery>(GetPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPage', 'query', variables);
    },
    createPage(variables: CreatePageMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreatePageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePageMutation>(CreatePageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPage', 'mutation', variables);
    },
    getProject(variables: GetProjectQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProjectQuery>(GetProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProject', 'query', variables);
    },
    getTags(variables?: GetTagsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagsQuery>(GetTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTags', 'query', variables);
    },
    getTagById(variables: GetTagByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTagByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagByIdQuery>(GetTagByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTagById', 'query', variables);
    },
    updateTag(variables: UpdateTagMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateTagMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTagMutation>(UpdateTagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTag', 'mutation', variables);
    },
    createTag(variables: CreateTagMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateTagMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTagMutation>(CreateTagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTag', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type GetBlocksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlocksQuery = { __typename?: 'Query', getBlocks: Array<{ __typename?: 'Block', id: number, type: string, title: string, endpoint: string }> };

export type GetBlockQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBlockQuery = { __typename?: 'Query', getBlock?: { __typename?: 'Block', id: number, type: string, title: string, endpoint: string } | null };

export type GetBlogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlogsQuery = { __typename?: 'Query', blogs: Array<{ __typename?: 'Blog', image: string, title: string, slug: string, summary: string, publishedAt?: string | null, tags: Array<{ __typename?: 'Tag', slug: string, title: string }> }> };

export type GetBlogsAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlogsAdminQuery = { __typename?: 'Query', blogsAdmin: Array<{ __typename?: 'Blog', image: string, title: string, slug: string, summary: string, publishedAt?: string | null, tags: Array<{ __typename?: 'Tag', slug: string, title: string }> }> };

export type BlogBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type BlogBySlugQuery = { __typename?: 'Query', blog?: { __typename?: 'Blog', slug: string, title: string, summary: string, content: string, image: string, published: boolean, publishedAt?: string | null, tags: Array<{ __typename?: 'Tag', id: number, slug: string, title: string }> } | null };

export type CreateBlogMutationVariables = Exact<{
  blog: InputBlog;
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createBlog: { __typename?: 'Blog', title: string, summary: string, content: string, image: string, published: boolean, tags: Array<{ __typename?: 'Tag', slug: string, title: string }> } };

export type UpdateBlogMutationVariables = Exact<{
  slug: Scalars['String']['input'];
  blog: InputBlog;
}>;


export type UpdateBlogMutation = { __typename?: 'Mutation', updateBlog: { __typename?: 'ResponseBase', success: boolean } };

export type GetHeadersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHeadersQuery = { __typename?: 'Query', headers: Array<{ __typename?: 'HeaderItem', slug: string, name: string }> };

export type GetHerosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHerosQuery = { __typename?: 'Query', getHeros: Array<{ __typename?: 'Hero', id: number, type: string, image: string, title: string, subtitle: string, content: string }> };

export type GetPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPagesQuery = { __typename?: 'Query', getPages: Array<{ __typename?: 'Page', id: number, slug: string, title: string }> };

export type GetPageQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetPageQuery = { __typename?: 'Query', page?: { __typename?: 'Page', id: number, slug: string, title: string, hero: { __typename?: 'Hero', id: number, type: string, image: string, title: string, subtitle: string, content: string }, blocks: Array<{ __typename?: 'Block', id: number, title: string, type: string, endpoint: string }> } | null };

export type CreatePageMutationVariables = Exact<{
  payload: InputPage;
}>;


export type CreatePageMutation = { __typename?: 'Mutation', createPage: { __typename?: 'ResponseBase', success: boolean } };

export type GetProjectQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', slug: number, title: string, hero: { __typename?: 'HeroProject', type: number, image: string, title: string, subtitle: string, content: string }, blocks: Array<{ __typename?: 'BlockProject', name: string, value: number, type: string }> } | null };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', getTags: Array<{ __typename?: 'Tag', id: number, slug: string, title: string, image: string, content: string }> };

export type GetTagByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTagByIdQuery = { __typename?: 'Query', tag?: { __typename?: 'Tag', id: number, slug: string, title: string, content: string, image: string, link?: string | null } | null };

export type UpdateTagMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  payload: InputTag;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: { __typename?: 'ResponseTag', success: boolean } };

export type CreateTagMutationVariables = Exact<{
  payload: InputTag;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'ResponseTag', success: boolean } };
