export const BACKEND_API =
  process.env.NODE_ENV !== "production"
    ? "http://nam-bookingcare.herokuapp.com"
    : "https://nam-bookingcare.herokuapp.com";

export const menuHeader = [
  "specialist",
  "health_facilities",
  "doctor",
  "examination_service",
];

export const menuSub = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Cẩm nang",
    href: "/",
  },
  {
    title: "Liên hệ",
    href: "/",
  },
  {
    title: "Vai trò BookingCare",
    href: "",
  },
  {
    title: "Câu hỏi thường gặp",
    href: "/",
  },
  {
    title: "Quy chế hoạt động",
    href: "/",
  },
  {
    title: "Đăng nhập",
    href: "login",
  },
];

export const placeHolderSearch = [
  "specialist",
  "hospital",
  "reason",
  "doctor",
  "clinic",
];

export const suggestSearch = [
  "specialist",
  "medical",
  "general",
  "dental",
  "surgery",
  "mental",
  "test",
];

export const systemHeader = [
  {
    parent: "user",
    child: {
      admin: ["all", "patient", "doctor", "schedule", "admin"],
      doctor: ["schedule"],
    },
  },
  "clinic",
  "specialist",
  "handbook",
];
