import request from "supertest";
import app from "..";

describe("employee API Endpoints", () => {
  // Ajoutez d'autres tests ici
  it("responds with json", function (done) {
    request(app).get("/api/employee").expect(200, done);
  });
});
