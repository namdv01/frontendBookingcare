import React from "react";
import logo from "../assets/bookingcare-logo.svg";
import { GoLocation, GoCheck } from "react-icons/go";
import "../scss/footer.scss";

const Footer = () => {
  return (
    <div className="footerSection">
      <div className="leftFooter">
        <img src={logo} alt="" />
        <h2>Công ty Cổ phần Công nghệ BookingCare</h2>
        <p>
          <GoLocation
            size="18"
            color="#5acbe4"
            style={{ paddingRight: "2px" }}
          />
          <span>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
        </p>
        <p>
          <GoCheck size="18" color="#f7d800" style={{ paddingRight: "2px" }} />
          <span>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</span>
        </p>
      </div>
      <div className="rightFooter">
        <ul className="col1">
          <li>Liên hệ hợp tác</li>
          <li>Gói chuyển đổi số doanh nghiệp</li>
          <li>Tuyển dụng</li>
          <li>Câu hỏi thường gặp</li>
          <li>Điều khoản sử dụng</li>
          <li>Chính sách bảo mật</li>
          <li>Quy trình hỗ trợ giải quyết khiếu nại</li>
          <li>Quy chế hoạt động</li>
        </ul>
        <ul className="col2">
          <li>
            <div>Trụ sở Hà Nội</div>
            <p>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
          </li>
          <li>
            <div>Văn phòng tại TP Hồ Chí Minh</div>
            <p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
          </li>
          <li>
            <div>Hỗ trợ khách hàng</div>
            <p>support@bookingcare.vn (7h - 18h)</p>
          </li>
        </ul>
      </div>

      <div className="footer-bottom">
        <small>© 2022 BookingCare.</small>
      </div>
    </div>
  );
};

export default Footer;
