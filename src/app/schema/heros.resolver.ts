import { Arg, Query, Resolver } from "type-graphql";
import { Hero } from "./heros.schema";
import { heros } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db/drizzle";


@Resolver(Hero)
export class HeroResolver {
  @Query(() => Hero, { nullable: true })
  async hero(
    @Arg("type", () => String) type: string
  ): Promise<Hero | undefined> {
    const hero = await db
      .select()
      .from(heros)
      .where(eq(heros.type, type));
    if (!hero.length) {
      throw new Error("Hero not found");
    }
    return hero[0];
  }
  @Query(() => [Hero])
  async getHeros(): Promise<Hero[]> {
    const result = await db.execute(
      sql`SELECT * FROM heros`
    );
    return result.rows as unknown as Hero[]
  }
}