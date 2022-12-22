import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { isAxiosError } from "axios";

const Login = () => {
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUsernameErrText("");
    setPasswordErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target as HTMLFormElement);
    const username = (data.get("username") as string).trim();
    const password = (data.get("password") as string).trim();

    let isError = false;

    if (username === "") {
      setUsernameErrText("名前を入力してください");
      isError = true;
    }
    if (password === "") {
      setPasswordErrText("パスワードを入力してください");
      isError = true;
    }

    if (isError) return;
    setLoading(true);

    // 新規登録APIを叩く
    try {
      const res = await authApi.login({
        username,
        password,
      });

      if ("token" in res) {
        localStorage.setItem("token", res.token as string);
      }
      console.log("ログインに成功しました");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (isAxiosError(error) && error.response && error.response.data) {
        const errors: [{ msg: string; param: string }] =
          error.response.data.errors;
        errors.forEach((err: { msg: string; param: string }) => {
          if (err.param === "username") {
            setUsernameErrText(err.msg);
          }
          if (err.param === "password") {
            setPasswordErrText(err.msg);
          }
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          id="username"
          name="username"
          label="お名前"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""}
          disabled={loading}
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          id="password"
          name="password"
          label="パスワード"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
          disabled={loading}
        />
        <LoadingButton
          sx={{
            mt: 3,
            mb: 2,
          }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;
