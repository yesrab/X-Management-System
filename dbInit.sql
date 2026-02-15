BEGIN;

-- =====================================================
-- CLEAN DATABASE (SAFE ORDER + RESET IDS)
-- =====================================================
TRUNCATE TABLE "CollectionFeatureMap",
"FeatureCollection",
"ModuleFeature",
"User",
"UserType",
"Policy",
"UserStatus" RESTART IDENTITY CASCADE;

-- =====================================================
-- USER STATUS
-- =====================================================
INSERT INTO
  "UserStatus" ("status")
VALUES
  ('ACTIVE'),
  ('LOCKED');

-- =====================================================
-- MODULE FEATURES
-- =====================================================
INSERT INTO
  "ModuleFeature" ("permissionKey", "type", "method")
VALUES
  ('dashboard:view', 'ROUTE', NULL),
  ('users:get', 'API', 'GET'),
  ('users:create', 'API', 'POST'),
  ('users:component', 'COMPONENT', NULL),
  ('DANGER:reset_data', 'API', NULL);

-- =====================================================
-- POLICY
-- =====================================================
INSERT INTO
  "Policy" ("policyName", "description")
VALUES
  ('ADMIN_POLICY', 'Full system access');

-- =====================================================
-- FEATURE COLLECTION
-- =====================================================
INSERT INTO
  "FeatureCollection" ("name", "description", "policyId")
VALUES
  (
    'ADMIN_FEATURES',
    'All admin permissions',
    (
      SELECT
        id
      FROM
        "Policy"
      WHERE
        "policyName" = 'ADMIN_POLICY'
    )
  );

-- =====================================================
-- MAP FEATURES TO COLLECTION
-- =====================================================
INSERT INTO
  "CollectionFeatureMap" ("collectionId", "moduleFeatureId")
SELECT
  fc.id,
  mf.id
FROM
  "FeatureCollection" fc
  CROSS JOIN "ModuleFeature" mf
WHERE
  fc.name = 'ADMIN_FEATURES';

-- =====================================================
-- USER TYPE
-- =====================================================
INSERT INTO
  "UserType" ("userType", "userPolicyId")
VALUES
  (
    'ADMIN',
    (
      SELECT
        id
      FROM
        "Policy"
      WHERE
        "policyName" = 'ADMIN_POLICY'
    )
  );

-- =====================================================
-- ADMIN USER
-- =====================================================
INSERT INTO
  "User" (
    "userId",
    "passwordHash",
    "userTypeId",
    "statusId",
    "incorrectLoginAttempts",
    "maxLoginAttempts",
    "currentActiveLogins",
    "maxActiveLogins"
  )
VALUES
  (
    'admin',
    '<PASTE_HASH_HERE>',
    (
      SELECT
        id
      FROM
        "UserType"
      WHERE
        "userType" = 'ADMIN'
    ),
    (
      SELECT
        id
      FROM
        "UserStatus"
      WHERE
        "status" = 'ACTIVE'
    ),
    0,
    5,
    '[]',
    3
  );

COMMIT;