import { openDatabase } from "@/util/database";

interface Params {
  params: {
    id: string;
  };
}

export default async function User({ params }: Params) {
  const role = await getRole(params.id);
  const linkedPermissions = await getPermissions(params.id);
  const allPermissions = await getAllPermissions();

  const linkedPermissionIds = new Set(linkedPermissions.map(({ id }) => id));
  const selectablePermissions = allPermissions.filter((permission) => {
    return !linkedPermissionIds.has(permission.id);
  });

  return (
    <main>
      <h1>Role: {role.name}</h1>
      <h2>Linked Permissions</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {linkedPermissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.name}</td>
              <td>
                <form method="POST" action="/roles/unlink">
                  <input type="hidden" name="role_id" value={role.id}/>
                  <input type="hidden" name="permission_id" value={permission.id}/>
                  <button type="submit">Unlink</button>
                </form>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>
              <form method="POST" action="/roles/link">
                <input type="hidden" name="role_id" value={role.id}/>
                <select name="permission_id">
                  {selectablePermissions.map((permission) => (
                    <option key={permission.id} value={permission.id}>
                      {permission.name}
                    </option>
                  ))}
                </select>
                <button type="submit">Link</button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

const getRole = async (id: string) => {
  const database = await openDatabase();
  return database.get(`SELECT * FROM roles WHERE id = ?`, id);
};

const getPermissions = async (roleId: string) => {
  const database = await openDatabase();
  return database.all(`
      SELECT *
      FROM role_to_permissions r2p
               INNER JOIN permissions p ON r2p.permission_id = p.id
      WHERE r2p.role_id = ?`, roleId);
};

const getAllPermissions = async () => {
  const database = await openDatabase();
  return database.all("SELECT * FROM permissions;");
};
