import { NextResponse } from "next/server";
import { main } from "@/prisma/seed";
import { prisma } from "@/lib/prisma";
import { verify } from "@node-rs/argon2";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed in production" }, { status: 403 });
  }

  let body: any = {};
  try {
    body = await request.json();
  } catch (e) {
    // ignore - treat as empty body
  }

  // If override credentials provided, verify user and permission
  if (body?.override && (body.override.userId || body.override.userid)) {
    const userId = body.override.userId ?? body.override.userid;
    const password = body.override.password ?? body.override.pass ?? body.override.pw;

    if (!password) {
      return NextResponse.json({ error: "Password required for override" }, { status: 400 });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { userId },
        include: { userType: true },
      });

      if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const ok = await verify(user.passwordHash, password);
      if (!ok) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const policyId = user.userType?.userPolicyId;
      if (!policyId) {
        return NextResponse.json({ error: "No policy assigned to user" }, { status: 403 });
      }

      const feature = await prisma.moduleFeature.findFirst({
        where: {
          permissionKey: "DANGER:reset_data",
          featureLists: { some: { featureCollection: { policyId } } },
        },
      });

      if (!feature) {
        return NextResponse.json(
          { error: "User not authorized to reset database" },
          { status: 403 },
        );
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Authorization check failed" }, { status: 500 });
    }
  }

  try {
    await main();
    return NextResponse.json({ success: true, message: "Database reset and seeded successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
