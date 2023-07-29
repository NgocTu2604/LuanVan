import { Link } from "react-router-dom";
import "../asset/css/Navbar.css";

function Navbar() {
  return (
    <div className="wrap-title-bar">
      <ul className="title-bar">
        <li className="dropdown">
          <Link to="javascript:void(0)" className="dropbtn">
            PHIM
          </Link>
          <div className="dropdown-content">
            <Link to="/current">PHIM ĐANG CHIẾU</Link>
            <Link to="/upcoming">PHIM SẮP CHIẾU</Link>
          </div>
        </li>
        <li className="dropdown">
          <Link to="javascript:void(0)" className="dropbtn">
            GÓC ĐIỆN ẢNH
          </Link>
          <div className="dropdown-content">
            <Link to="/showdirector">ĐẠO DIỄN</Link>
            <Link to="/showactor">DIỄN VIÊN</Link>
          </div>
        </li>

        

        <li className="dropdown">
          <Link to="/infoticket" className="dropbtn">
            GIÁ VÉ
          </Link>
          <div className="dropdown-content">{/* link dropdown */}</div>
        </li>
       
        <li className="dropdown">
          <Link to="/contact" className="dropbtn">
            HỖ TRỢ
          </Link>
          <div className="dropdown-content">{/* link dropdown */}</div>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
