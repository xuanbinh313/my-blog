ALTER TABLE "blogs" RENAME COLUMN "status" TO "published";--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "updatedAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "updatedAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "updatedAt" timestamp NOT NULL;