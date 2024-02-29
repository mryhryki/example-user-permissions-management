import { openDatabase } from "@/util/database";
import Link from "next/link";

export default async function Roles() {
  const roles = await getRoles();

  return (
    <main>
      <h1>Roles</h1>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            <Link href={`/roles/${role.id}`}>{role.name}</Link>
          </li>
        ))}
        <li>
          <form method="POST" action="/roles/create">
            <input type="text" name="role_name" placeholder="Name"/>
            <button type="submit">Create</button>
          </form>
        </li>
      </ul>
    </main>
  );
}

const getRoles = async () => {
  const database = await openDatabase();
  return database.all("SELECT * FROM roles;");
};

