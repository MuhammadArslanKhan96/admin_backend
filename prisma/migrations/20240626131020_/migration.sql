/*
  Warnings:

  - You are about to drop the `nft_transection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `nft_transection`;

-- CreateTable
CREATE TABLE `nft_transaction` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nfttoken_id` INTEGER NOT NULL,
    `nft_id` INTEGER NOT NULL,
    `buyer` TEXT NOT NULL,
    `seller` TEXT NOT NULL,
    `transaction_hash` TEXT NOT NULL,
    `transaction_time` TEXT NOT NULL,
    `price` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stalking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` TEXT NOT NULL,
    `type` TEXT NOT NULL,
    `created_by` INTEGER NOT NULL,
    `created_at` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
