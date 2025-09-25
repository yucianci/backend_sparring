-- CreateTable
CREATE TABLE "public"."organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pilots" INTEGER NOT NULL,
    "flightHours" INTEGER NOT NULL,
    "airships" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "securityObs" TEXT NOT NULL,
    "generalObs" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);
