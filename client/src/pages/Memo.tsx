import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";

const Memo = () => {
  const navigate = useNavigate();
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [favorit, setFavorit] = useState(false);
  const [favoritPosition, setFavoritPosition] = useState(0);
  const [icon, setIcon] = useState("");
  const [positon, setPositon] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        if (memoId) {
          const memo: any = await memoApi.getOne(memoId);
          setTitle(memo.title);
          setDescription(memo.description);
          setFavorit(memo.favorit);
          setFavoritPosition(memo.favoritPosition);
          setIcon(memo.icon);
          setPositon(memo.positon);
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, [memoId]);

  let timer: ReturnType<typeof setTimeout>;
  const timeout = 500;

  const titleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId!, { title: newTitle });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  const descriptionUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId!, { description: newDescription });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    if (!window.confirm("このメモを完全に削除していいですか？")) return;
    try {
      const deleted = await memoApi.delete(memoId!);
      if (deleted) navigate("/memo");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <TextField
          onChange={titleUpdate}
          placeholder="無題"
          value={title}
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: 700 },
          }}
        />
        <TextField
          onChange={descriptionUpdate}
          placeholder="ここに自由に入力してください。"
          value={description}
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "1rem" },
          }}
        />
      </Box>
    </>
  );
};

export default Memo;
