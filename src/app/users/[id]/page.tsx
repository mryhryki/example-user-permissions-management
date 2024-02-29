import { openDatabase } from "@/util/database";

interface Params {
  params: {
    id: string;
  };
}

export default async function User({ params }: Params) {
  const user = await getUser(params.id);
  const roles = await getRoles(params.id);
  const permissions = await Promise.all(roles.map((role) => getPermissions(role.id)));
  const roleToPermissionsMapping: Record<string, any[]> = permissions.flat().reduce((mapping, permission) => {
    mapping[permission.role_id] ??= [];
    mapping[permission.role_id].push(permission);
    return mapping;
  }, {});

  return (
    <main>
      <h1>Users</h1>
      <ul>
        <li>Name: {user.name}</li>
        <li>
          Roles:
          <ul>
            {roles.map((role) => {
                const permissions = roleToPermissionsMapping[role.id];
                return (
                  <li key={role.id}>
                    {role.name}
                    {permissions == null ? null : (
                      <ul>
                        {permissions.map((permission) => (
                          <li key={permission.id}>{permission.name}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              },
            )}
          </ul>
        </li>
      </ul>
    </main>
  );
}

const getUser = async (id: string) => {
  const database = await openDatabase();
  return database.get("SELECT * FROM users WHERE id = ?", id);
};

const getRoles = async (userId: string) => {
  const database = await openDatabase();
  return database.all(`
      SELECT *
      FROM user_to_roles u2r
               INNER JOIN roles r ON u2r.role_id = r.id
      WHERE u2r.user_id = ?`, userId);
};

const getPermissions = async (roleId: string) => {
  const database = await openDatabase();
  return database.all(`
      SELECT *
      FROM role_to_permissions r2p
               INNER JOIN permissions p ON r2p.permission_id = p.id
      WHERE r2p.role_id = ?`, roleId);
};
