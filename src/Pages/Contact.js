import React from "react";
import "../asset/css/Contact.css";
function Contact() {
  return (
    <div className="wrap-contact">
      <div
        className="wrap-contact-item"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dia5z4i6s/image/upload/v1690370153/movie/jt8n9fjjxidlgwlspeyr.jpg")`,
        }}
      >
        <div className="item-head">Liên hệ</div>
        <div className="item-head">NGOCTU CINEMA</div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item">HEADQUATER</div>
        <div className="item">
          Địa chỉ: 180 Đ. Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh
        </div>
        <a href="https://www.facebook.com/profile.php?id=100008899961609">
          <i class="fa-brands fa-square-facebook"></i>{" "}
          https://www.facebook.com/NGOCTU
        </a>
      </div>
    </div>
  );
}

export default Contact;
