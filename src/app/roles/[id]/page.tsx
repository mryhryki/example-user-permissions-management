import { openDatabase } from "@/util/database";

interface Params {
  params: {
    id: string;
  };
}

export default async function User({ params }: Params) {
  const role = await getRole(params.id);
  const permissions = await getPermissions(params.id);

  return (
    <main>
      <h1>Users</h1>
      <ul>
        <li>Name: {role.name}</li>
        <li>
          Permissions:
          <ul>
            {permissions.map((permission) => (
              <li key={permission.id}>{permission.name}</li>
            ))}
          </ul>
        </li>
      </ul>
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
