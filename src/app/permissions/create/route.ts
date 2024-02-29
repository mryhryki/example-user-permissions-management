import { openDatabase } from "@/util/database";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const formData = await request.formData();

  const id = crypto.randomUUID();
  const key = formData.get("key");
  const name = formData.get("name");

  const database = await openDatabase();
  await database.run(`INSERT INTO permissions (id, key, name)
                      VALUES (?, ?, ?)`, id, key, name);

  redirect("/permissions");
}
