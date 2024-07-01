/*
  Warnings:

  - Added the required column `creator_wallet` to the `stalking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stalked_user` to the `stalking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stalking` ADD COLUMN `creator_wallet` TEXT NOT NULL,
    ADD COLUMN `stalked_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `stalked_user` INTEGER NOT NULL;
