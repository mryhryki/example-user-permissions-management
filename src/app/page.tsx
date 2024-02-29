import Link from "next/link";

export default function Home() {
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
