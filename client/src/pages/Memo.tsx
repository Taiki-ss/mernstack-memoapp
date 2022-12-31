import { AxiosResponse } from "axios";
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
      <h2>{title}</h2>
      <p>{description}</p>
    </>
  );
};

export default Memo;
