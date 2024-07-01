-- CreateTable
CREATE TABLE "collections" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "description" TEXT,
    "logo_image" TEXT,
    "banner_image" TEXT,
    "kind" JSONB,
    "category" JSONB,
    "sub_category" JSONB,
    "collection_address" TEXT,
    "blockchain" TEXT,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "royalty_commission" INTEGER NOT NULL,
    "primary_owner" TEXT NOT NULL,
    "secondary_owner" JSONB,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "properties" JSONB NOT NULL,
    "blockchain" TEXT NOT NULL,
    "supply_quantity" INTEGER NOT NULL,
    "contact_address" TEXT NOT NULL,
    "token_id" TEXT NOT NULL,
    "token_standard" TEXT NOT NULL,
    "creator_fee" TEXT NOT NULL,
    "open_auction" JSONB,
    "fix_price" JSONB,
    "mystery_box" JSONB,
    "level" INTEGER NOT NULL,
    "sub_category" TEXT NOT NULL,
    "insurance_per_hour" DECIMAL(10,0) NOT NULL,
    "listingid" TEXT,
    "created_at" TEXT,

    CONSTRAINT "nft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "wallet" TEXT NOT NULL,
    "contact_details" TEXT,
    "password" TEXT NOT NULL,
    "img" TEXT,
    "address" TEXT,
    "country" TEXT,
    "created_at" TEXT,
    "role" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_transaction" (
    "id" SERIAL NOT NULL,
    "nfttoken_id" INTEGER NOT NULL,
    "nft_id" INTEGER NOT NULL,
    "buyer" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "transaction_hash" TEXT NOT NULL,
    "transaction_time" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "nft_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stalking" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_by" INTEGER NOT NULL,
    "created_at" TEXT,
    "creator_wallet" TEXT NOT NULL,
    "stalked_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stalked_user" JSONB NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "nft_id" INTEGER NOT NULL,

    CONSTRAINT "stalking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "users"("email");

