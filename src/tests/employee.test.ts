import request, { Response } from "supertest";
import { app, server } from "..";

let response: Response;

describe("employee API Endpoints", () => {
  beforeEach(async () => {
    response = await request(app).get("/api/employee");
  });

  afterEach(() => {
    response = null as any;
  });

  it("responds data with status 200", async () => {
    expect(response.status).toBe(200);
  });

  it("responds when calling liste employe", async () => {
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("check if employe have details", async () => {
    response.body.forEach((item: any) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("firstName");
      expect(item).toHaveProperty("department");
      expect(item).toHaveProperty("checkins");
      expect(Array.isArray(item.checkins)).toBe(true);
    });
  });
});

afterAll(() => {
  server.close();
});
