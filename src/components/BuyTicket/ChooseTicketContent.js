import React, { useEffect, useState } from "react";
import "../../asset/css/ChooseTicketContent.css";
import { API } from "../../API";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function ChooseTicketContent(props) {
  const [ticket, setTicket] = useState([]);
  const {
    setAmountTicket,
    amountTicket,
    setTotal,
    setAmountChildrenTicket,
    amountChildrenTicket,
  } = props;
  console.log(amountChildrenTicket, setAmountChildrenTicket);
  const [price, setPrice] = useState([]);
  const navigate = useNavigate();
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
      console.log(getData.data);
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
            <td>Vé thường</td>
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
            {
              <>
                <td>70000</td>
                <td>{Number(70000) * amountTicket}</td>
              </>
            }
          </tr>
          <tr>
            <td>Vé trẻ em</td>
            <td>
              <i
                onClick={() => {
                  if (amountChildrenTicket > 1) {
                    setAmountChildrenTicket(amountChildrenTicket - 1);
                  }
                }}
                className="fa-solid fa-circle-minus"
              ></i>
              {/* change */}
              <input
                className="input"
                onChange={(e) => setAmountChildrenTicket(e.target.value)}
                value={amountChildrenTicket}
                type="number"
                disabled={true}
              ></input>
              <i
                onClick={() => {
                  if (amountChildrenTicket < 5) {
                    setAmountChildrenTicket(amountChildrenTicket + 1);
                  }
                }}
                className="fa-solid fa-circle-plus"
              ></i>
            </td>
            {
              <>
                <td>30000</td>
                <td>{Number(30000) * amountChildrenTicket}</td>
              </>
            }
          </tr>

          <tr>
            <td colSpan={3}>Tổng</td>
            <td>
              {setTotal(
                Number(30000) * amountChildrenTicket +
                  Number(70000) * amountTicket
              )}
            </td>
          </tr>
        </div>
      </div>
    </div>
  );
}

export default ChooseTicketContent;
