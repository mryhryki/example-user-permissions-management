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
      </ul>
    </main>
  );
}
const getRoles = async () => {
  const database = await openDatabase();
  return database.all("SELECT * FROM roles;");
};
