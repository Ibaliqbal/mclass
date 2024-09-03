import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      code: string;
      id: string;
    };
  }
) {
  return Response.json(
    { statusCode: 200, message: "Berhasil" },
    { status: 200 }
  );
}
