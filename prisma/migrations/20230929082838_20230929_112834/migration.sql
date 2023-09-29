-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "department" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckinCheckout" (
    "id" SERIAL NOT NULL,
    "checkin" TIMESTAMP(3) NOT NULL,
    "checkout" TIMESTAMP(3) NOT NULL,
    "comment" TEXT,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "CheckinCheckout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckinCheckout" ADD CONSTRAINT "CheckinCheckout_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
