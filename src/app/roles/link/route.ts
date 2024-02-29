import { openDatabase } from "@/util/database";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const formData = await request.formData();

  const roleId = formData.get("role_id");
  const permissionId = formData.get("permission_id");

  const database = await openDatabase();
  await database.run(`INSERT INTO role_to_permissions (role_id, permission_id) VALUES (?, ?)`, roleId, permissionId);

  redirect(`/roles/${roleId}`);
}
