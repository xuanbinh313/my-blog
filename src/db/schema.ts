import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const heros = pgTable("heros", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  image: text("image").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  content: text("content"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const blocks = pgTable("blocks", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  endpoint: text("endpoint").unique().notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  content: text("content").notNull(),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const techs = pgTable("tags", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").unique().notNull(),
  image: text("image").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  hero: integer("hero_id").references(() => heros.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const pageBlocks = pgTable("page_blocks", {
  id: serial("id").primaryKey(),
  pageId: integer("page_id")
    .references(() => pages.id)
    .notNull(),
  blockId: integer("block_id")
    .references(() => blocks.id)
    .notNull(),
  position: integer("position").notNull(), // To define the order of blocks in the page
});

export const pageRelations = relations(pages, ({ many }) => ({
  blocks: many(pageBlocks), // Many blocks for each page through pageBlocks
}));

export const blockRelations = relations(blocks, ({ many }) => ({
  pages: many(pageBlocks), // Many pages for each block through pageBlocks
}));

export const blogTags = pgTable("blog_tags", {
  id: serial("id").primaryKey(),
  blogId: integer("blog_id")
    .references(() => blogs.id)
    .notNull(),
  tagId: integer("tag_id")
    .references(() => techs.id)
    .notNull(),
});
export const blogRelations = relations(blogs, ({ many }) => ({
  tags: many(blogTags),
}));

export const tagRelations = relations(techs, ({ many }) => ({
  blogs: many(blogTags),
}));
