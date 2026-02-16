import { NextResponse } from "next/server";
import { main } from "@/prisma/seed";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed in production" }, { status: 403 });
  }
  try {
    await main();
    return NextResponse.json({ success: true, message: "Database reset and seeded successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
