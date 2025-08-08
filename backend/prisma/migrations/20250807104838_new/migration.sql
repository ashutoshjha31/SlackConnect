/*
  Warnings:

  - Added the required column `expiresAt` to the `SlackToken` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SlackToken" (
    "teamId" TEXT NOT NULL PRIMARY KEY,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL
);
INSERT INTO "new_SlackToken" ("accessToken", "refreshToken", "teamId") SELECT "accessToken", "refreshToken", "teamId" FROM "SlackToken";
DROP TABLE "SlackToken";
ALTER TABLE "new_SlackToken" RENAME TO "SlackToken";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
