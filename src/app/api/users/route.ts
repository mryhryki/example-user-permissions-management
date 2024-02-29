import { openDatabase } from "@/util/database";

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get("id");

  const database = await openDatabase();
  const user = await database.get(`SELECT *
                                   FROM users
                                   WHERE id = ?`, userId);
  const roleIds = await database.all(`SELECT roles.id
                                      FROM user_to_roles
                                               INNER JOIN roles ON user_to_roles.role_id = roles.id
                                      WHERE user_id = ?`, user.id);
  const permissionIds = (await Promise.all(roleIds.map(async ({ id: roleId }) => {
    return (await database.all(`SELECT permission_id
                                FROM role_to_permissions
                                WHERE role_id = ?`, roleId)).map(({ permission_id }) => permission_id);
  }))).flat();
  const permissions = await database.all(`SELECT * FROM permissions WHERE id IN (${permissionIds.map(() => "?").join(", ")})`, permissionIds);

  const data = JSON.stringify({ user, permissions }, null, 2);
  return new Response(data, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

