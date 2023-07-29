import React, { useState } from "react";
import { useEffect } from "react";
import { API } from "../API";
import { useParams } from "react-router-dom";
function BillDetail() {
  const [detail, setDetail] = useState([]);
  const param = useParams();

  useEffect(() => {
    const getDetail = async () => {
      const res = await fetch(`${API}bill/getdetailbill/${param.id}`);
      const getData = await res.json();
      setDetail(getData.data);
    };
    getDetail();
  }, [param.id]);

  return (
    <div>
      <h1 style={{ marginLeft: "150px" }} className="profile-title">
        CHI TIẾT HÓA ĐƠN
      </h1>
      <h1 style={{ marginLeft: "150px" }} className="profile-title">
        SỐ LƯỢNG VÉ: {detail.length}
      </h1>
      <div className="wrap-bill">
        <div className="bill-content">
          <div className="bill">
            <tr>
              <th>Phim</th>
              <th>Ngày chiếu</th>
              <th>Phòng</th>
              <th>Giờ chiếu</th>
              <th>Ghế</th>
              <th>Giá vé</th>
              <th>Loại vé</th>
            </tr>
            {detail.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.title}</td>
                  <td style={{ textAlign: "center" }}>{item.date}</td>
                  <td style={{ textAlign: "center" }}>{item.room_name}</td>
                  <td style={{ textAlign: "center" }}>{item.time_start}</td>
                  <td style={{ textAlign: "center" }}>{item.seat_name}</td>
                  <td style={{ textAlign: "center" }}>{item.prices}</td>
                  <td style={{ textAlign: "center" }}>{item.type}</td>
                </tr>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillDetail;
