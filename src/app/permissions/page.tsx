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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.key}</td>
              <td>{permission.name}</td>
              <td>
                <form method="post" action="/permissions/delete">
                  <input type="hidden" name="permission_id" value={permission.id}/>
                  <button type="submit">Delete</button>
                </form>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>
              <form method="post" action="/permissions/create"
                    style={{ display: "flex", justifyContent: "space-between" }}>
                <input type="text" name="key" placeholder="key"/>
                <input type="text" name="name" placeholder="name"/>
                <button type="submit">Add</button>
              </form>
            </td>
          </tr>
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
