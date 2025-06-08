// app/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function HomePage() {
  const token = cookies().get("token")?.value;

  // if (token) {
  //   redirect("/dashboard");
  // } else {
  //   redirect("/auth/login");
  // }

  return null; // kommer inte att visas
}
