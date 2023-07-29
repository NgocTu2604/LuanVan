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
  let moneyChild = 0;
  let moneyNormal = 0;
  const navigate = useNavigate();
  const param = useParams();

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
      const res = await fetch(`${API}ticket/gettickettype`);
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
          {price.map((item, index) => {
            if (item.type === "Trẻ em") {
              moneyChild = item.prices;
            } else if (item.type === "Vé bình thường") {
              moneyNormal = item.prices;
            }
            return (
              <tr>
                <td>{item.description}</td>
                <td>
                  <i
                    onClick={() => {
                      if (item.type === "Trẻ em" && amountChildrenTicket > 0) {
                        setAmountChildrenTicket(amountChildrenTicket - 1);
                      }
                      if (item.type === "Vé bình thường" && amountTicket > 0) {
                        setAmountTicket(amountTicket - 1);
                      }
                    }}
                    className="fa-solid fa-circle-minus"
                  ></i>
                  {/* change */}
                  <input
                    className="input"
                    onChange={(e) => {
                      if (item.type === "Trẻ em")
                        setAmountChildrenTicket(e.target.value);
                      else if (item.type === "Vé bình thường")
                        setAmountTicket(e.target.value);
                    }}
                    value={
                      item.type === "Trẻ em"
                        ? amountChildrenTicket
                        : amountTicket
                    }
                    type="number"
                    disabled={true}
                  ></input>
                  <i
                    onClick={() => {
                      if (item.type === "Trẻ em" && amountChildrenTicket < 5) {
                        setAmountChildrenTicket(amountChildrenTicket + 1);
                      }
                      if (item.type === "Vé bình thường" && amountTicket < 5) {
                        setAmountTicket(amountTicket + 1);
                      }
                    }}
                    className="fa-solid fa-circle-plus"
                  ></i>
                </td>
                {
                  <>
                    <td>{item.prices}</td>
                    <td>
                      {item.prices *
                        (item.type === "Trẻ em"
                          ? amountChildrenTicket
                          : item.type === "Vé bình thường"
                          ? amountTicket
                          : 0)}
                    </td>
                  </>
                }
              </tr>
            );
          })}

          <tr>
            <td colSpan={3}>Tổng</td>
            <td>
              {Number(moneyChild) * amountChildrenTicket +
                Number(moneyNormal) * amountTicket}
              {setTotal(
                Number(moneyChild) * amountChildrenTicket +
                  Number(moneyNormal) * amountTicket
              )}
            </td>
          </tr>
        </div>
      </div>
    </div>
  );
}

export default ChooseTicketContent;
