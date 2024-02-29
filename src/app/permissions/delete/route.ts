import { openDatabase } from "@/util/database";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const formData = await request.formData()
  const permissionId = formData.get('permission_id')

  const database = await openDatabase();
  await database.all(`DELETE FROM permissions WHERE id = ?`, permissionId);

  redirect("/permissions")
}
