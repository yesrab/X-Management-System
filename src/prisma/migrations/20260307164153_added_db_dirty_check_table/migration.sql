-- CreateTable
CREATE TABLE "dbMetaData" (
    "id" SERIAL NOT NULL,
    "dirty" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "dbMetaData_pkey" PRIMARY KEY ("id")
);
