import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { FileType, OptionType } from "@/__global/type";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, description, images, ProjectType, skills } = body;

    if (!title) {
      return new NextResponse("title  is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("description  is required", { status: 400 });
    }

    if (!images.length) {
      return new NextResponse("images  is required", { status: 400 });
    }
    if (!ProjectType) {
      return new NextResponse("ProjectType  is required", { status: 400 });
    }

    if (!skills.length) {
      return new NextResponse("skills  is required", { status: 400 });
    }

    const newProject = await db.project.create({
      data: {
        title,
        description,
        images: [...images.map((u: FileType) => u.url)],
        ProjectType,
        tags: {
          connect: [
            ...skills.map((p: OptionType) => ({
              id: p.id,
            })),
          ],
        },
      },
    });

    return NextResponse.json("newProject");
  } catch (error) {
    console.log("[PROJECT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
