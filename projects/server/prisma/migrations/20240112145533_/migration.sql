/*
  Warnings:

  - You are about to drop the `EventMarathonType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Onsite', 'Online');

-- DropForeignKey
ALTER TABLE "EventMarathonType" DROP CONSTRAINT "EventMarathonType_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "type" "EventType" NOT NULL,
ALTER COLUMN "published" DROP DEFAULT;

-- DropTable
DROP TABLE "EventMarathonType";

-- DropEnum
DROP TYPE "MarathonType";
