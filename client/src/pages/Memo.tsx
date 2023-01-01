import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import memoApi from "../api/memoApi";

const Memo = () => {
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
          console.log(memo.title);
          setTitle(memo.title);
          setDescription(memo.description);
          setFavorit(memo.favorit);
          setFavoritPosition(memo.favoritPosition);
          setIcon(memo.icon);
          setPositon(memo.positon);
        }
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    })();
  }, [memoId]);

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
        <IconButton color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <TextField
				  placeholder="無題"
				  value={`${icon} ${title}`}
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: 700 },
          }}
        />
        <TextField
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
