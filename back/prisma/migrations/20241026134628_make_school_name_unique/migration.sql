/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `SchoolName` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Report_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "SchoolName_name_key" ON "SchoolName"("name");
