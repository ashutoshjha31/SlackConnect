-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScheduledMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "scheduledAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING'
);
INSERT INTO "new_ScheduledMessage" ("channel", "id", "message", "scheduledAt", "teamId") SELECT "channel", "id", "message", "scheduledAt", "teamId" FROM "ScheduledMessage";
DROP TABLE "ScheduledMessage";
ALTER TABLE "new_ScheduledMessage" RENAME TO "ScheduledMessage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
