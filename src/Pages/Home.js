import Container from "./Container";

import BuyTicket from "../components/BuyTicket/BuyTicket";
import Carousel from "./Carousel";
// import { useState } from "react";
function Home(props) {
  const { setValues } = props;
  // const [a, setA] = useState({});
  // console.log(a);
  return (
    <>
      <div style={{position: 'relative'}}>
        <Carousel />
        <BuyTicket setValues={setValues}  />
      </div>
      <Container />
    </>
  );
}

export default Home;
