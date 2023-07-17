import "./App.css";
import React, { useState } from "react";
import Home from "./Pages/Home";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import BuyTicket from "./components/BuyTicket/BuyTicket";
import InfoMovie from "./components/BuyTicket/InfoMovie";
import ShowActor from "./components/News/ShowActor";
import ShowDirector from "./components/News/ShowDirector";
import Seat from "./components/Seat";
import Header from "./Pages/Header";
import Navbar from "./Pages/Navbar";
import FooterPage from "./Pages/FooterPage";
import FooterBottom from "./Pages/FooterBottom";
import ChooseTicket from "./components/BuyTicket/ChooseTicket";
import ChooseTicketContent from "./components/BuyTicket/ChooseTicketContent";
import InfoBuyTicket from "./components/BuyTicket/InfoBuyTicket";
import InfoTicket from "./Pages/InfoTicket";
import Confirm from "./components/BuyTicket/Confirm";
import Carousel from "./Pages/Carousel";
import CurrentMovie from "./components/Movies/CurrentMovie";
import UpcomingMovie from "./components/Movies/UpcomingMovie";
import Profile from "./User/Profile";
import NotFound from "./Pages/NotFound";
import InfoActor from "./components/News/InfoActor";
import InfoDirector from "./components/News/InfoDirector";
import MyContext from "./components/Store/Context";
function App() {
  const [viewRegister, setViewRegister] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  const [values, setValues] = useState({});
  const [viewActor, setViewActor] = useState({});
  const [viewDirector, setViewDirector] = useState({});

  const Layout = (children) => {
    return (
      <>
        <Header
          viewRegister={viewRegister}
          setViewRegister={setViewRegister}
          viewLogin={viewLogin}
          setViewLogin={setViewLogin}
        />
        <Navbar />
        {viewLogin && (
          <div className="container_form">
            <div onClick={() => setViewLogin(false)} className="close_form">
              <p>X</p>
            </div>
            <LoginPage
              setViewLogin={setViewLogin}
              setViewRegister={setViewRegister}
            />
          </div>
        )}
        {viewRegister && (
          <div className="container_form">
            <div onClick={() => setViewRegister(false)} className="close_form">
              <p>X</p>
            </div>
            <RegisterPage
              setViewRegister={setViewRegister}
              setViewLogin={setViewLogin}
            />
          </div>
        )}
        <div className="col-span-11">
          <Outlet />
        </div>
        <FooterPage />
        <FooterBottom />
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home setValues={setValues} />,
        },
        {
          path: "/register",
          element: (
            <RegisterPage
              setViewRegister={setViewRegister}
              setViewLogin={setViewLogin}
            />
          ),
        },
        {
          path: "/login",
          element: (
            <LoginPage
              setViewLogin={setViewLogin}
              setViewRegister={setViewRegister}
            />
          ),
        },
        {
          path: "/infoticket",
          element: <InfoTicket />,
        },
        {
          path: "/InfoMovie/:id",
          element: <InfoMovie setValues={setValues} />,
        },
        {
          path: "/seat/:id",
          element: <Seat />,
        },
        {
          path: "/ticket",
          element: <ChooseTicket values={values} />,
        },
        {
          path: "/confirm",
          element: <Confirm />,
        },
        {
          path: "/current",
          element: <CurrentMovie/>
        }
        ,
        {
          path: "/upcoming",
          element: <UpcomingMovie/>
        },{
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/showactor",
          element: <ShowActor/>
        },
        {
          path: "/infoactor",
          element: <InfoActor/>
        },
        {
          path: "/infodirector",
          element: <InfoDirector/>
        },
        {
          path: "/showdirector",
          element: <ShowDirector/>
        },
        {
          path: "/404",
          element: <NotFound/>
        }


        
      ],
    },
  ]);
  const valueContext = {
    viewLogin: viewLogin,
    setViewLogin: setViewLogin
  }
  return (
  <MyContext.Provider value={valueContext}>
    <RouterProvider router={router} />
  </MyContext.Provider>
  );
}

export default App;
