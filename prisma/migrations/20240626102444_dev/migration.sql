-- CreateTable
CREATE TABLE `collections` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` TEXT NOT NULL,
    `url` TEXT NULL,
    `description` TEXT NULL,
    `logo_image` TEXT NULL,
    `featured_image` TEXT NULL,
    `banner_image` TEXT NULL,
    `kind` JSON NULL,
    `category` JSON NULL,
    `sub_category` JSON NULL,
    `collection_address` TEXT NULL,
    `blockchain` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nft` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `royalty_commission` INTEGER NOT NULL,
    `primary_owner` TEXT NOT NULL,
    `secondary_owner` JSON NULL,
    `type` TEXT NOT NULL,
    `category` TEXT NOT NULL,
    `img` TEXT NOT NULL,
    `collection_id` INTEGER NOT NULL,
    `kind` TEXT NOT NULL,
    `properties` JSON NOT NULL,
    `blockchain` TEXT NOT NULL,
    `supply_quantity` INTEGER NOT NULL,
    `contact_address` TEXT NOT NULL,
    `token_id` TEXT NOT NULL,
    `token_standard` TEXT NOT NULL,
    `creator_fee` TEXT NOT NULL,
    `open_auction` JSON NULL,
    `fix_price` JSON NULL,
    `mystery_box` JSON NULL,
    `level` INTEGER NOT NULL,
    `sub_category` TEXT NOT NULL,
    `insurance_per_hour` DECIMAL(10, 0) NOT NULL,
    `listingid` TEXT NULL,
    `created_at` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nft_transection` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nfttoken_id` INTEGER NOT NULL,
    `nft_id` INTEGER NOT NULL,
    `buyyer` TEXT NOT NULL,
    `seller` TEXT NOT NULL,
    `transection_hash` TEXT NOT NULL,
    `transection_time` TEXT NOT NULL,
    `price` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nftmarket` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nft_id` INTEGER NOT NULL,
    `listing` BOOLEAN NOT NULL,
    `seller` TEXT NOT NULL,
    `resell` BOOLEAN NOT NULL,
    `reselling_price` FLOAT NULL,
    `reselling_listingid` INTEGER NULL,
    `reselling_name` TEXT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nftorders` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `nft_id` INTEGER NOT NULL,
    `developer_id` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `name` TEXT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `wallet` TEXT NOT NULL,
    `contact_details` TEXT NULL,
    `password` VARCHAR(255) NOT NULL,
    `img` TEXT NULL,
    `address` TEXT NULL,
    `country` TEXT NULL,
    `created_at` TEXT NULL,

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
