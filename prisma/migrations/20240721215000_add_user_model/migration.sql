/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `registeredAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `password`,
    DROP COLUMN `registeredAt`;

-- DropTable
DROP TABLE `Profile`;
