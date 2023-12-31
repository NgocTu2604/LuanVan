import { json, useNavigate } from "react-router-dom";
import "../asset/css/main.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../API";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";

function Header(props) {
  const { viewLogin, setViewLogin } = props;
  const { viewRegister, setViewRegister } = props;
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  //SEARCH
  const [results, setResults] = useState([]);
  const [resultEnter, setResultEnter] = useState(false);

  ///icon avatar
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/')
  };
  ///
  const handleHome = (item) => {
    navigate("/");
  };
  const handleProfile = (item) => {
    navigate("/profile");
  };

  return (
    <div className="header">
      <div onClick={handleHome} style={{userSelect:"none", cursor:"pointer"}} className="header-logo">
        NGOCTU
      </div>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} setResultEnter={setResultEnter} />
        <SearchResultsList results={results} resultEnter={resultEnter} />
      </div>
      {user ? (
        <div style={{ marginTop: "15px" }}>
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>{user.name}</MenuItem>
              <MenuItem onClick={handleProfile}>
                {/* <Avatar />  */}
                Thông tin cá nhân
              </MenuItem>
              <Divider />

              {/* <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem> */}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Đăng xuất
              </MenuItem>
            </Menu>
          </React.Fragment>
        </div>
      ) : (
        <div className="header-login">
          <p style={{userSelect: "none", cursor: "pointer"}} onClick={() => setViewLogin(!viewLogin)}>Đăng nhập</p>
          <p style={{userSelect: "none", cursor: "pointer"}} onClick={() => setViewRegister(!viewRegister)}>Đăng ký</p>
        </div>
      )}
    </div>
  );
}
export default Header;
