import React, { useState } from "react";
import ChooseTicketContent from "./ChooseTicketContent";
import InfoBuyTicket from "./InfoBuyTicket";
import Seat from "../Seat";
import Confirm from "./Confirm";
export default function ChooseTicket(props) {
  const {values} = props
  const [showSeat, setShowSeat] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [listSeat, setListSeat] = useState([]);
  const [total, setTotal] = useState(0);
  //   change
  const [amountTicket, setAmountTicket] = useState(0);
  //change
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="wrap-ticket">
      {showSeat ? <Seat values = {values} setListSeat = {setListSeat} listSeat = {listSeat} amountTicket = {amountTicket}/> : confirm === true ? <Confirm setConfirm={setConfirm} setListSeat={setListSeat} setShowSeat={setShowSeat} setShowBack ={setShowBack} showBack = {showBack}/> : <ChooseTicketContent setTotal={setTotal} setListSeat = {setListSeat}  setAmountTicket = {setAmountTicket} amountTicket= {amountTicket}/>}
      <InfoBuyTicket amountTicket={amountTicket} total={total} confirm = {confirm} setConfirm = {setConfirm} setListSeat = {setListSeat} listSeat = {listSeat} values = {values} setShowSeat={setShowSeat} showBack= {showBack} setShowBack ={setShowBack} />
    </div>
  );
}
