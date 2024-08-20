-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "url" TEXT NOT NULL,
    "favicon" TEXT,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);
