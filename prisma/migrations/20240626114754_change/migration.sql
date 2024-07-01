/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `id` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    ADD COLUMN `role` TEXT NOT NULL,
    MODIFY `id` INTEGER NOT NULL,
    MODIFY `password` TEXT NOT NULL,
    ADD PRIMARY KEY (`id`);
