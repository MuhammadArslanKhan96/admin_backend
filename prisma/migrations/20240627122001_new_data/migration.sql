/*
  Warnings:

  - Added the required column `collection_id` to the `stalking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nft_id` to the `stalking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stalking` ADD COLUMN `collection_id` INTEGER NOT NULL,
    ADD COLUMN `nft_id` INTEGER NOT NULL;
