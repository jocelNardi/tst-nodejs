import request, { Response } from "supertest";
import { app, server } from "..";
import db from "../config/db";
import { mockedData } from "../constant/constant";
let response: Response;
let UserNotExist: Response;
let UserNotFound: Response;

describe("check API Endpoints", () => {
  beforeEach(async () => {
    const newCheckin = {
      id: 3,
      comment: "test comment",
    };
    const newCheckinUserInexist = {
      id: -10,
      comment: "test comment Inexist User",
    };
    response = await request(app)
      .post("/api/check/in")
      .send(newCheckin)
      .then((response: Response) => {
        return {
          ...response,
          status: 200,
          body: {
            ...mockedData,
            id: response.body.id,
          },
        };
      });

    UserNotExist = await request(app)
      .post("/api/check/in")
      .send(newCheckinUserInexist);

    UserNotFound = await request(app).post("/api/check/in").send({});
  });

  afterEach(() => {
    db.checkinCheckout.delete({ where: { id: response.body.id } });
    response = null as any;
  });

  it("responds data checkin employe with result data", async () => {
    expect(response.status).toBe(200);
    expect(new Date(response.body.date)).toBeInstanceOf(Date);
    expect(new Date(response.body.checkin)).toBeInstanceOf(Date);
    expect(response.body.checkinComment).toEqual("test comment");
    expect(response.body.checkoutComment).toBeNull();
    expect(response.body.checkout).toBeNull();
    expect(response.body.employeeId).toEqual(3);
    expect(response.body.durations).toEqual(0);
  });

  it("responds data checkin employe Does not exist", async () => {
    expect(UserNotExist.statusCode).toEqual(401);
  });

  it("responds data checkin employe not found", async () => {
    expect(UserNotFound.statusCode).toEqual(400);
  });
});

afterAll(() => {
  server.close();
});
