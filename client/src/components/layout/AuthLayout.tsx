// カスタム型を定義
import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import notionLogo from "../../assets/images/notion-logo.png";

const AuthLayout = () => {
  return (
    <>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={notionLogo}
            alt=""
            style={{ width: 100, height: 100, marginTop: 3 }}
          />
          Notion
        </Box>
        <Outlet />
      </Container>
    </>
  );
};

export default AuthLayout;
