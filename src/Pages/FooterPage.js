import "../asset/css/main.css";

function FooterPage() {
  return (
    <div className="footer-bg">
      <div className="footer-content">
        <ul className="footer-item">
          <h1>GIỚI THIỆU</h1>
          <li>VỀ CHÚNG TÔI</li>
          <li>THỎA THUẬN SỬ DỤNG</li>
          <li>QUY CHẾ HOẠT ĐỘNG</li>
          <li>CHÍNH SÁCH BẢO MẬT</li>
        </ul>
        <ul className="footer-item">
          <h1>GÓC ĐIỆN ẢNH</h1>
          <li>ĐẠO DIỄN</li>
          <li>DIỄN VIÊN</li>
        </ul>
        <ul className="footer-item">
          <h1>HỖ TRỢ</h1>
          <li>SĐT: 0972 199</li>
          <li>ĐỊA CHỈ: 108 Cao Lỗ</li>
          <li>EMAIL: tunguyen13963@gmail.com</li>
          <li>HƯỚNG DẪN SỬ DỤNG</li>
        </ul>
        <ul className="footer-item">
          <h1>KẾT NỐI RẠP CHIẾU PHIM</h1>
          <div >
            <li style={{display: 'inline'}}>
              <i class="fa-brands fa-facebook"></i>
            </li>
            <li style={{display: 'inline'}}>
              <i class="fa-brands fa-facebook"></i>
            </li>
          </div>
          <li>DOWLOAD APP</li>
          <li>LOGO</li>
        </ul>
      </div>
    </div>
  );
}

export default FooterPage;
