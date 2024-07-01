/*
  Warnings:

  - Changed the type of `stalked_user` on the `stalking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `stalking` DROP COLUMN `stalked_user`,
    ADD COLUMN `stalked_user` JSON NOT NULL;
