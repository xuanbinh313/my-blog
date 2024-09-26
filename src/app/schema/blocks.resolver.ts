import { Arg, ID, Query, Resolver } from "type-graphql";
import { blocks } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { Block } from "./blocks.schema";


@Resolver(Block)
export class BlockResolver {
  
  @Query(() => Block, { nullable: true })
  async getBlock(
    @Arg("id", () => ID) id: number
  ): Promise<Block | undefined> {
    const block = await db
      .select()
      .from(blocks)
      .where(eq(blocks.id, id));
    if (!block.length) {
      throw new Error("Hero not found");
    }
    return block[0];
  }

  @Query(() => [Block])
  async getBlocks(): Promise<Block[]> {
    const result = await db.execute(
      sql`SELECT * FROM ${blocks}`
    );
    return result.rows as unknown as Block[]
  }
}