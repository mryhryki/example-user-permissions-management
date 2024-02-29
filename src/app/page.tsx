import { openDatabase } from "@/util/database";
import Link from "next/link";

export default async function Home() {
  const users = await getUsers()
  console.debug('#####', JSON.stringify({ users }, null, 2));

  return (
    <main>
      <h1>example-user-permissions-management</h1>
      <ul>
        <li><Link href="/users">Users</Link></li>
        <li><Link href="/roles">Roles</Link></li>
        <li><Link href="/permissions">Permissions</Link></li>
      </ul>
    </main>
  );
}

const getUsers = async() => {
  const database = await openDatabase()
  return database.get('SELECT * FROM users')
}
