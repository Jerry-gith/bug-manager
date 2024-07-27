/*
  Warnings:

  - You are about to drop the column `userId` on the `Bug` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Bug` DROP FOREIGN KEY `Bug_userId_fkey`;

-- AlterTable
ALTER TABLE `Bug` DROP COLUMN `userId`,
    ADD COLUMN `userAssignedToBug` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Bug` ADD CONSTRAINT `Bug_userAssignedToBug_fkey` FOREIGN KEY (`userAssignedToBug`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
