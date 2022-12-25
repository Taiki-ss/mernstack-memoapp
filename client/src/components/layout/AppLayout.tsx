// カスタム型を定義
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";

const AppLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // JWTを持っているのか確認する
    const checkJWT = async () => {
      // 認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      }
    };
    checkJWT();
  }, [navigate]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
