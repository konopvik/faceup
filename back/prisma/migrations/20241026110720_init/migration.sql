-- CreateTable
CREATE TABLE "SchoolName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SchoolName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "file" BYTEA NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SchoolReports" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SchoolReports_AB_unique" ON "_SchoolReports"("A", "B");

-- CreateIndex
CREATE INDEX "_SchoolReports_B_index" ON "_SchoolReports"("B");

-- AddForeignKey
ALTER TABLE "_SchoolReports" ADD CONSTRAINT "_SchoolReports_A_fkey" FOREIGN KEY ("A") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolReports" ADD CONSTRAINT "_SchoolReports_B_fkey" FOREIGN KEY ("B") REFERENCES "SchoolName"("id") ON DELETE CASCADE ON UPDATE CASCADE;
