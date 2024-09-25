import { db } from "../drizzle";
import {
  blocks,
  blogs,
  blogTags,
  heros,
  pageBlocks,
  pages,
  techs,
  users,
} from "../schema";

async function seed() {
  try {
    // Clear existing data
    await db.delete(pageBlocks);
    await db.delete(blogTags);
    await db.delete(users);
    await db.delete(pages);
    await db.delete(heros);
    await db.delete(blocks);
    await db.delete(blogs);
    await db.delete(techs);

    // Seed users
    await db
      .insert(users)
      .values([
        { name: "admin", email: "admin@example.com", image: "avatar1.png" },
      ]);

    // Seed heros
    const heroIds = await db
      .insert(heros)
      .values([
        {
          type: "banner",
          image:
            "https://framerusercontent.com/images/b5HcLGiq8nXy29HRuyCjLcs90.svg",
          title: "BinhCoDev",
          subtitle: "@xuanbinh313",
          content:
            "Hi, I'm Trần Xuân Bình, a creative Web Designer who loves to craft visually stunning websites.",
        },
        {
          type: "feature",
          image:
            "https://framerusercontent.com/images/b5HcLGiq8nXy29HRuyCjLcs90.svg",
          title: "Features",
          subtitle: "Amazing Features",
          content: "Check out our amazing features.",
        },
      ])
      .returning({ id: heros.id });

    // Seed blocks
    const blockIds = await db
      .insert(blocks)
      .values([
        { type: "projects", endpoint: "projects", title: "Projects" },
        { type: "blogs", endpoint: "blogs", title: "Blogs" },
        { type: "cta", endpoint: "cta", title: "Contact Us" },
      ])
      .returning({ id: blocks.id });

    // Seed blogs
    const blogsIds = await db
      .insert(blogs)
      .values([
        {
          slug: "first-post",
          title: "First Blog Post",
          summary: "This is the first blog post.",
          image: "bg1.jpeg",
          content: "This is the first blog post.",
          published: true,
        },
        {
          slug: "second-post",
          title: "Second Blog Post",
          summary: "This is the second blog post.",
          image: "bg2.png",
          content: "This is the second blog post.",
          published: false,
        },
      ])
      .returning({ id: blogs.id });

    // Seed techs
    const techIds = await db
      .insert(techs)
      .values([
        {
          slug: "javascript",
          title: "JavaScript",
          image: "js.jpg",
          content: "JavaScript is a programming language.",
        },
        {
          slug: "python",
          title: "Python",
          image: "python.jpg",
          content: "Python is a programming language.",
        },
        {
          slug: "java",
          title: "Java",
          image: "java.webp",
          content: "Java is a programming language.",
        },
        {
          slug: "reactjs",
          title: "ReactJS",
          image: "reactjs.svg",
          content: "ReactJS is a framework of Javascript.",
        },
      ])
      .returning({ id: techs.id });

    // Seed pages
    const pageIds = await db
      .insert(pages)
      .values([
        { slug: "home", title: "Home", hero: heroIds[0].id },
        { slug: "about", title: "About Us", hero: heroIds[1].id },
      ])
      .returning({ id: pages.id });

    // Seed pageBlocks
    await db.insert(pageBlocks).values([
      { pageId: pageIds[0].id, blockId: blockIds[0].id, position: 1 },
      { pageId: pageIds[0].id, blockId: blockIds[1].id, position: 2 },
      { pageId: pageIds[1].id, blockId: blockIds[0].id, position: 1 },
    ]);

    // Seed blogTags
    await db.insert(blogTags).values([
      { blogId: blogsIds[0].id, tagId: techIds[0].id },
      { blogId: blogsIds[0].id, tagId: techIds[1].id },
      { blogId: blogsIds[1].id, tagId: techIds[0].id },
    ]);

    console.log("Seed data successfully inserted");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

seed();
