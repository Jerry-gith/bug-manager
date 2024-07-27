/*
  Warnings:

  - You are about to drop the column `userAssignedToBug` on the `Bug` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Bug` DROP FOREIGN KEY `Bug_userAssignedToBug_fkey`;

-- AlterTable
ALTER TABLE `Bug` DROP COLUMN `userAssignedToBug`,
    ADD COLUMN `userId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Bug` ADD CONSTRAINT `Bug_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
