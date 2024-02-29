import { openDatabase } from "@/util/database";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get("role_id");

  const database = await openDatabase();
  await database.run(`DELETE FROM roles WHERE id = ?`, id);

  redirect(`/roles`);
}

