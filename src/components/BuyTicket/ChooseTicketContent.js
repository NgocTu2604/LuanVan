import React, { useEffect, useState } from "react";
import "../../asset/css/ChooseTicketContent.css";
import { API } from "../../API";
import { useParams } from "react-router-dom";

function ChooseTicketContent(props) {
  const [ticket, setTicket] = useState([]);
  const { setAmountTicket, amountTicket, setTotal } = props;
  const [price, setPrice] = useState([]);
  const param = useParams();
  let total = 0;
  useEffect(() => {
    const getTicket = async () => {
      const res = await fetch(`${API}room/getSeatByRoom/${param.id}`);
      const getData = await res.json();
      setTicket(getData.data);
    };
    getTicket();
  }, [param.id]);

  useEffect(() => {
    const getPrice = async () => {
      const res = await fetch(`${API}ticket/price`);
      const getData = await res.json();
      setPrice(getData.data);
    };
    getPrice();
  }, []);

  return (
    <div className="wrap-booking-ticket">
      <div className="booking-ticket-content">
        <h2>CHỌN VÉ</h2>
        <div className="booking-ticket">
          <tr>
            <th>Loại vé</th>
            <th>Số lượng</th>
            <th>Giá (VNĐ)</th>
            <th>Tổng (VNĐ)</th>
          </tr>
          <tr>
            <td>Khách</td>
            <td>
              <i
                onClick={() => {
                  if (amountTicket > 1) {
                    setAmountTicket(amountTicket - 1);
                  }
                }}
                className="fa-solid fa-circle-minus"
              ></i>
              {/* change */}
              <input
                className="input"
                onChange={(e) => setAmountTicket(e.target.value)}
                value={amountTicket}
                type="number"
                disabled={true}
              ></input>
              <i
                onClick={() => {
                  if (amountTicket < 5) {
                    setAmountTicket(amountTicket + 1);
                  }
                }}
                className="fa-solid fa-circle-plus"
              ></i>
            </td>
            {price?.map((item, index) => {
              total = Number(item.price) * amountTicket;
              setTotal(total);
              return (
                <>
                  <td>{item.price}</td>
                  <td>{Number(item.price) * amountTicket}</td>
                </>
              );
            })}
          </tr>

          <tr>
            <td colSpan={3}>Tổng</td>
            <td>{total}</td>
          </tr>
        </div>
      </div>
    </div>
  );
}

export default ChooseTicketContent;
