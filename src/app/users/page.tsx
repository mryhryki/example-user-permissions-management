import { openDatabase } from "@/util/database";
import Link from "next/link";

export default async function Users() {
  const users = await getUsers();

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
      <p style={{ textAlign: "center", fontSize: "0.85rem" }}>
        <Link href="/">Back to Home</Link>
      </p>
    </main>
  );
}

const getUsers = async () => {
  const database = await openDatabase();
  return database.all("SELECT * FROM users;");
};
