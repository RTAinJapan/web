/*
  Warnings:

  - Added the required column `endsAt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MarathonType" AS ENUM ('ONLINE', 'ONSITE');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "endsAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "EventMarathonType" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "marathonType" "MarathonType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventMarathonType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventMarathonType_eventId_marathonType_key" ON "EventMarathonType"("eventId", "marathonType");

-- AddForeignKey
ALTER TABLE "EventMarathonType" ADD CONSTRAINT "EventMarathonType_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
