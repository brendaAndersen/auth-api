/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `PhysicsPioneer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PhysicsPioneer_email_key" ON "PhysicsPioneer"("email");
