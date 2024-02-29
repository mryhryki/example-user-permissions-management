import { openDatabase } from "@/util/database";
import Link from "next/link";

export default async function Roles() {
  const roles = await getRoles();

  return (
    <main>
      <h1>Roles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td><Link href={`/roles/${role.id}`}>{role.name}</Link></td>
              <td>
                <form method="POST" action="/roles/delete">
                  <input type="hidden" name="role_id" value={role.id}/>
                  <button type="submit">Delete</button>
                </form>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>
              <form method="POST" action="/roles/create">
                <input type="text" name="role_name" placeholder="Name"/>
                <button type="submit">Create</button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>

      <p style={{ textAlign: "center", fontSize: "0.85rem" }}>
        <Link href="/">Back to Home</Link>
      </p>
    </main>
  );
}

const getRoles = async () => {
  const database = await openDatabase();
  return database.all("SELECT * FROM roles;");
};

