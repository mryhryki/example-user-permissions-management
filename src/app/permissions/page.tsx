import { openDatabase } from "@/util/database";

export default async function Permissions() {
  const permissions = await getPermissions();

  return (
    <main>
      <h1>Permissions</h1>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.key}</td>
              <td>{permission.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

const getPermissions = async () => {
  const database = await openDatabase();
  return database.all(`SELECT *
                       FROM permissions`);
};
