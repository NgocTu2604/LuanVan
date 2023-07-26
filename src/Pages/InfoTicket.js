import React from "react";
import "../asset/css/InfoTicket.css";
function InfoTicket() {
  return (
    <div className="wrap-content-ticket">
      <table className="content-ticket">
        <tr className="mr5">
          <th className="mh5">Cinema</th>
          <th className="mh5">Suất chiếu</th>
          <th className="mh5">Người lớn</th>
          <th className="mh5">Trẻ em</th>
        </tr>
        <tr className="mr5">
          <td className="mh5">Tất cả các ngày trong tuần</td>
          
          <td className="mh5">70.000 VNĐ</td>
          <td className="mh5">35.000 VNĐ</td>
        </tr>
      </table>
    </div>
  );
}

export default InfoTicket;
