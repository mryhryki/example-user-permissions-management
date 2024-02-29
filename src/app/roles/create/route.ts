import { openDatabase } from "@/util/database";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const formData = await request.formData();

  const id = crypto.randomUUID();
  const name = formData.get("role_name");

  const database = await openDatabase();
  await database.run(`INSERT INTO roles (id, name) VALUES (?, ?)`, id, name);

  redirect(`/roles/${id}`);
}

