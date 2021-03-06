import React, { useEffect, useCallback, useState } from "react";
import { useWindowScroll } from "react-use";
import View from "./View";
import CommentView from "./CommentView";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BOARD_USER_API } from "../../Enum";
import HeaderNav from "../../Components/Organisms/Header/Header";

function BoardDetail() {
  const { categoryId, boardId } = useParams();
  const [userData, setUserData] = useState([]);
  const [commentUserData, setCommentUserData] = useState([]);
  const [refresh, setRfresh] = useState("");
  const [likeData, setLikeData] = useState(0);
  const [refreshLike, setRefreshLike] = useState("");
  const [refreshComment, setRefreshComment] = useState("");

  const { y } = useWindowScroll();
  useEffect(() => {
    const scrollTop = () => window.scrollTo({ top: 100 });

    if (y > 100) {
      scrollTop();
    }
  }, [boardId]);
  const getUserData = async () => {
    const result = await axios
      .get(`${BOARD_USER_API}/community/categories/${categoryId}/boards/${boardId}`)
      .then((res) => {
        if (res) {
          setUserData(res.data.CONTEXT[0]);
          setLikeData(res.data.CONTEXT[0].like);
        } else {
          alert("작성자 정보를 가져오길 실패했습니다");
        }
      });
  };

  const getUserView = async () => {
    const result = await axios.get(`${BOARD_USER_API}/community/categories/${categoryId}/boards/${boardId}/hits`);
  };

  const getUserCommentData = async () => {
    const result = await axios.get(`${BOARD_USER_API}/community/boards/${boardId}/comments`);
    setCommentUserData(result.data.CONTEXT);
  };

  useEffect(() => {
    getUserView();
  }, []);

  useEffect(() => {
    getUserData();
  }, [refresh]);

  useEffect(() => {
    getUserData();
  }, [refreshLike]);

  useEffect(() => {
    getUserCommentData();
  }, [refreshComment]);

  return (
    <>
      <HeaderNav />

      <DetailContainer>
        <View
          userData={userData}
          categoryId={categoryId}
          boardId={boardId}
          setUserData={setUserData}
          commentUserData={commentUserData}
          likeData={likeData}
          setRefreshLike={setRefreshLike}
        />
        <CommentView
          categoryId={categoryId}
          setRefreshComment={setRefreshComment}
          boardId={boardId}
          userData={userData}
          commentUserData={commentUserData}
        />
      </DetailContainer>
    </>
  );
}

export default BoardDetail;

const DetailContainer = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
