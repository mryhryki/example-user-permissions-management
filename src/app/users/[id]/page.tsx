import { openDatabase } from "@/util/database";
import Link from "next/link";

interface Params {
  params: {
    id: string;
  };
}

export default async function User({ params }: Params) {
  const user = await getUser(params.id);

  const linkedRoles = await getRoles(params.id);
  const allRoles = await getAllRoles();
  const nonLinkedRoles = allRoles.filter((role) => !linkedRoles.some((linkedRole) => linkedRole.id === role.id));

  const permissions = await Promise.all(linkedRoles.map((role) => getPermissions(role.id)));
  const roleToPermissionsMapping: Record<string, any[]> = permissions.flat().reduce((mapping, permission) => {
    mapping[permission.role_id] ??= [];
    mapping[permission.role_id].push(permission);
    return mapping;
  }, {});

  return (
    <main>
      <h1>User: {user.name}</h1>
      <h2>Linked Roles</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Permissions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {linkedRoles.map((role) => {
              const permissions = roleToPermissionsMapping[role.id];
              return (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>
                    {permissions == null ? "(none)" : (
                      <ul>
                        {permissions.map((permission) => (
                          <li key={permission.id}>{permission.name}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>
                    <form method="POST" action="/users/unlink_role">
                      <input type="hidden" name="user_id" value={user.id}/>
                      <input type="hidden" name="role_id" value={role.id}/>
                      <button type="submit">Unlink</button>
                    </form>
                  </td>
                </tr>
              );
            },
          )}
          {nonLinkedRoles.length > 0 && (
            <tr>
              <td colSpan={3}>
                <form method="POST" action="/users/link_role">
                  <input type="hidden" name="user_id" value={user.id}/>
                  <select name="role_id">
                    {nonLinkedRoles.map((role) => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                  <button type="submit">Link</button>
                </form>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <p style={{ textAlign: "center", fontSize: "0.85rem" }}>
        <Link href="/users">Back to Users</Link>
      </p>
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

const getAllRoles = async () => {
  const database = await openDatabase();
  return database.all(`SELECT *
                       FROM roles`);
};

const getPermissions = async (roleId: string) => {
  const database = await openDatabase();
  return database.all(`
      SELECT *
      FROM role_to_permissions r2p
               INNER JOIN permissions p ON r2p.permission_id = p.id
      WHERE r2p.role_id = ?`, roleId);
};
