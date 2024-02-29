import { openDatabase } from "@/util/database";

const task = async() => {
  const database = await openDatabase()

  // -------------------------------

  await database.run("CREATE TABLE users (id, name);");
  await database.run("INSERT INTO users (id, name) VALUES ('cf584640-4dce-4aad-86f8-869a983a9e9d', 'User-1');");
  await database.run("INSERT INTO users (id, name) VALUES ('282a563e-f25b-416e-ad70-62563e3145f0', 'User-2');");
  await database.run("INSERT INTO users (id, name) VALUES ('57f03202-5e59-4486-a4e7-dcdd2a322a4b', 'User-3');");

  // -------------------------------

  await database.run("CREATE TABLE roles (id, name);");
  await database.run("INSERT INTO roles (id, name) VALUES ('6c1f0361-1c0f-4bbe-b349-2625cdbad988', 'Role-1');");
  await database.run("INSERT INTO roles (id, name) VALUES ('fc09f2f0-02c8-4216-9a2b-93f6edb9330b', 'Role-2');");
  await database.run("INSERT INTO roles (id, name) VALUES ('803036a5-54bc-4bdb-8842-df887b278a77', 'Role-3');");

  // -------------------------------

  await database.run("CREATE TABLE permissions (id, key, name);");
  await database.run("INSERT INTO permissions (id, key, name) VALUES ('b2eccca0-3443-4940-8fea-ae06e5fc3262', 'resource1:create', 'リソース1作成権限');");
  await database.run("INSERT INTO permissions (id, key, name) VALUES ('971cd820-97f0-4211-9223-b4599462d91a', 'resource1:read',   'リソース1読み取り権限')");
  await database.run("INSERT INTO permissions (id, key, name) VALUES ('58436a3b-8893-4843-98d6-2a17556ba647', 'resource1:update', 'リソース1更新権限');");
  await database.run("INSERT INTO permissions (id, key, name) VALUES ('c65ea181-91a6-46a5-aa7a-ce184d4b828b', 'resource1:delete', 'リソース1削除権限');");

  await database.run("INSERT INTO permissions (id, key, name) VALUES ('37499d03-f4fb-4434-a006-caacd7fd241d', 'resource2:create', 'リソース2作成権限');");
  await database.run("INSERT INTO permissions (id, key, name) VALUES ('e0ca9c70-818a-4d25-86e3-c17a3eceaafd', 'resource2:read',   'リソース2読み取り権限')");
  await database.run("INSERT INTO permissions (id, key, name) VALUES ('27e0be1a-4613-4e08-8c29-d505e28bfc8a', 'resource2:update', 'リソース2更新権限');");

  await database.run("INSERT INTO permissions (id, key, name) VALUES ('bbfaabca-395c-4cc4-8b9c-a039dbfb1ea5', 'resource3:read',   'リソース3読み取り権限')");

  // -------------------------------

  await database.run("CREATE TABLE role_to_permissions (role_id, permission_id);");

  await database.run("INSERT INTO role_to_permissions (role_id, permission_id) VALUES ('6c1f0361-1c0f-4bbe-b349-2625cdbad988', 'b2eccca0-3443-4940-8fea-ae06e5fc3262')");
  await database.run("INSERT INTO role_to_permissions (role_id, permission_id) VALUES ('6c1f0361-1c0f-4bbe-b349-2625cdbad988', '971cd820-97f0-4211-9223-b4599462d91a')");
  await database.run("INSERT INTO role_to_permissions (role_id, permission_id) VALUES ('6c1f0361-1c0f-4bbe-b349-2625cdbad988', '58436a3b-8893-4843-98d6-2a17556ba647')");
  await database.run("INSERT INTO role_to_permissions (role_id, permission_id) VALUES ('6c1f0361-1c0f-4bbe-b349-2625cdbad988', 'c65ea181-91a6-46a5-aa7a-ce184d4b828b')");

  await database.run("INSERT INTO role_to_permissions (role_id, permission_id) VALUES ('fc09f2f0-02c8-4216-9a2b-93f6edb9330b', '37499d03-f4fb-4434-a006-caacd7fd241d')");
  await database.run("INSERT INTO role_to_permissions (role_id, permission_id) VALUES ('fc09f2f0-02c8-4216-9a2b-93f6edb9330b', 'e0ca9c70-818a-4d25-86e3-c17a3eceaafd')");
  await database.run("INSERT INTO role_to_permissions (role_id, permission_id) VALUES ('fc09f2f0-02c8-4216-9a2b-93f6edb9330b', '27e0be1a-4613-4e08-8c29-d505e28bfc8a')");

  await database.run("INSERT INTO role_to_permissions (role_id, permission_id) VALUES ('803036a5-54bc-4bdb-8842-df887b278a77', 'bbfaabca-395c-4cc4-8b9c-a039dbfb1ea5')");

  // -------------------------------

  await database.run("CREATE TABLE user_to_roles (user_id, role_id);");
  await database.run("INSERT INTO user_to_roles (user_id, role_id) VALUES ('cf584640-4dce-4aad-86f8-869a983a9e9d', '6c1f0361-1c0f-4bbe-b349-2625cdbad988')");
  await database.run("INSERT INTO user_to_roles (user_id, role_id) VALUES ('cf584640-4dce-4aad-86f8-869a983a9e9d', 'fc09f2f0-02c8-4216-9a2b-93f6edb9330b')");
  await database.run("INSERT INTO user_to_roles (user_id, role_id) VALUES ('cf584640-4dce-4aad-86f8-869a983a9e9d', '803036a5-54bc-4bdb-8842-df887b278a77')");
  await database.run("INSERT INTO user_to_roles (user_id, role_id) VALUES ('282a563e-f25b-416e-ad70-62563e3145f0', 'fc09f2f0-02c8-4216-9a2b-93f6edb9330b')");
  await database.run("INSERT INTO user_to_roles (user_id, role_id) VALUES ('57f03202-5e59-4486-a4e7-dcdd2a322a4b', '803036a5-54bc-4bdb-8842-df887b278a77')");
}

task()
