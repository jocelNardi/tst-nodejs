export const mockedData: {
  id: number;
  date: Date;
  checkin: Date;
  checkout: null;
  checkinComment: string;
  checkoutComment: null;
  durations: number;
  employeeId: number;
} = {
  id: 1,
  date: new Date("2023-09-29T11:44:11.384Z"),
  checkin: new Date("2023-09-29T11:44:11.384Z"),
  checkout: null,
  checkinComment: "test comment",
  checkoutComment: null,
  durations: 0,
  employeeId: 3,
};

export const SECRET_KEY = process.env.SECRET_KEY || "AZERTY";
export const ADMIN = {
  USERNAME: process.env.USERNAME_ADMIN || "Admin",
  PASSWORD: process.env.PASSWORD_ADMIN || "123456789",
};
