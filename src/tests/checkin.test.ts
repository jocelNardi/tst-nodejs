import request from "supertest";
import { app, server } from "..";
import db from "../config/db";

let response: request.Response;

beforeEach(async () => {
  const newCheckinCheckout = {
    id: 1,
    comment: "test comment",
  };
  response = await request(app).post("/api/check/in").send(newCheckinCheckout);
});

afterEach(() => {
  db.checkinCheckout.delete({ where: { id: response.body.id } });
  response = null as any;
});

describe("check API Endpoints", () => {
  it("responds data checkin employe with status 200", async () => {
    expect(response.statusCode).toEqual(200);
  });

  it("responds data checkin employe with result data", async () => {
    expect(new Date(response.body.date)).toBeInstanceOf(Date);
    expect(new Date(response.body.checkin)).toBeInstanceOf(Date);
    expect(response.body.checkinComment).toEqual("test comment");
    expect(response.body.checkoutComment).toBeNull();
    expect(response.body.checkout).toBeNull();
    expect(response.body.employeeId).toEqual(1);
    expect(response.body.durations).toEqual(0);
  });
});

afterAll(() => {
  server.close();
});
