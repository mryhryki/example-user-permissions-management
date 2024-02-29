import { openDatabase } from "@/util/database";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const formData = await request.formData();

  const userId = formData.get("user_id");
  const roleId = formData.get("role_id");

  const database = await openDatabase();
  await database.run(`DELETE FROM user_to_roles WHERE user_id = ? AND role_id = ?;`, userId, roleId);

  redirect(`/users/${userId}`);
}
