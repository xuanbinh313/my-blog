ALTER TABLE "blogs" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "pages" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "updatedAt" DROP NOT NULL;