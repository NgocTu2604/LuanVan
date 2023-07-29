import React from "react";
import "../asset/css/InfoTicket.css";
function InfoTicket() {
  return (
    <div className="wrap-content-ticket">
      <div
        className="wrap-content-ticket-item"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dia5z4i6s/image/upload/v1690370153/movie/jt8n9fjjxidlgwlspeyr.jpg")`,
        }}
      >
        <table className="content-ticket-item">
          <tr className="item1">
            <th className="item2">Cinema</th>
            <th className="item2">Suất chiếu</th>
            <th className="item2">Người lớn</th>
            <th className="item2">Trẻ em</th>
          </tr>
          <tr className="item1">
            <td className="item2">Tất cả các ngày trong tuần</td>
            <td className="item2">Tất cả các giờ</td>
            <td className="item2">70.000 VNĐ</td>
            <td className="item2">35.000 VNĐ</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default InfoTicket;
