export function ok<T>(data: T, init?: ResponseInit) {
  return Response.json({ success: true, data }, init);
}

export function created<T>(data: T) {
  return ok(data, { status: 201 });
}

export function badRequest(message: string) {
  return Response.json(
    {
      success: false,
      error: {
        code: "BAD_REQUEST",
        message,
      },
    },
    { status: 400 },
  );
}

export function unauthorized(message = "Authentication is required.") {
  return Response.json(
    {
      success: false,
      error: {
        code: "UNAUTHENTICATED",
        message,
      },
    },
    { status: 401 },
  );
}

export function serverError(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";

  return Response.json(
    {
      success: false,
      error: {
        code: "SERVER_ERROR",
        message,
      },
    },
    { status: 500 },
  );
}
