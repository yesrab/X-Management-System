import type { DbClient } from '@/lib/prisma';

/**
 * Check whether the database currently contains any data.
 *
 * @param prisma Prisma client instance used to query metadata tables.
 * @returns True if the DB is considered "dirty" (has data), otherwise false.
 */
export async function isDbDirty(prisma: DbClient): Promise<boolean> {
  const result = await prisma.$queryRaw<{ dirty: boolean }[]>`
    WITH meta_exists AS (
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'dbMetaData'
      ) AS exists
    )
    SELECT
      CASE
        WHEN meta_exists.exists THEN
          (SELECT dirty FROM "dbMetaData" LIMIT 1)
        ELSE
          EXISTS (
            SELECT 1
            FROM pg_stat_user_tables
            WHERE schemaname = 'public'
            AND n_live_tup > 0
          )
      END AS dirty
    FROM meta_exists
  `;

  return result[0]?.dirty ?? false;
}
