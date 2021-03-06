import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const CatListCard = ({ cardData, fromMyPage }) => {
  const moment = require("moment");
  const history = useHistory();

  const postClick = () => {
    const { category_id, board_id } = cardData;
    history.push(`/boardDetail/${category_id}/${board_id}`);
  };

  const goToUserPage = () => {
    if (cardData.comment_number === 0) {
      history.push(`/user/${cardData.user_id}/profile/topic`);
    } else {
      history.push(`/user/${cardData.coment_last.user_id}/profile/topic`);
    }
  };
  const htmlCode = cardData.content;

  return (
    <CatListCardWrapper>
      <CardLeft>
        <LeftTop onClick={postClick}>{cardData.title}</LeftTop>
        <LeftMiddle>
          {cardData.comment_number === 0 ? (
            <LeftMiddleImg dangerouslySetInnerHTML={{ __html: htmlCode }}></LeftMiddleImg>
          ) : (
            cardData.coment_last.content
          )}
        </LeftMiddle>
        <LeftBottom>
          {cardData.tags.map((el, id) => {
            return <LftBtmTags key={id}>{el.name}</LftBtmTags>;
          })}
          {!fromMyPage ? <LftBtmAuthor>By {cardData.user_nickname}</LftBtmAuthor> : <LftBtmAuthor></LftBtmAuthor>}
          <LftBtmRightView> {cardData.hit} Views</LftBtmRightView>
          <LftBtmRightReply> {cardData.comment_number} Replies</LftBtmRightReply>
          <LftBtmRightLike> {cardData.like} Likes</LftBtmRightLike>
        </LeftBottom>
      </CardLeft>
      <CardRight>
        {!fromMyPage && (
          <RightProfile onClick={goToUserPage}>
            {cardData.comment_number === 0
              ? cardData.user_nickname.slice(0, 1)
              : cardData.coment_last.nickname.slice(0, 1)}
          </RightProfile>
        )}
        {!fromMyPage && (
          <RightUserName>
            {!fromMyPage && (cardData.comment_number === 0 ? cardData.user_nickname : cardData.coment_last.nickname)}
          </RightUserName>
        )}
        <RightDate>{moment(cardData.created_at).fromNow()}</RightDate>
      </CardRight>
    </CatListCardWrapper>
  );
};
export default CatListCard;

const CatListCardWrapper = styled.div`
  display: flex;
  /* width: 100%; */
  width: 998px;
  height: 8em;
`;

const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1em;
  width: 88%;
  height: 100%;
`;

const LeftTop = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.4em;
  cursor: pointer;
`;
const LeftMiddle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 0.4em;
  font-size: 0.9em;
`;

const LeftMiddleImg = styled.div`
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
  margin-bottom: 0.4em;
  font-size: 0.9em;

  img {
    overflow: hidden;
    max-height: 30px;
    max-width: 30px;
  }
`;
const LeftBottom = styled.div`
  display: flex;
`;
const LftBtmTags = styled.span`
  border: 1px solid grey;
  border-radius: 8%;
  padding: 0.5em 0.5em;
  margin-right: 0.5em;
  font-size: 0.7em;
  color: grey;
`;
const LftBtmAuthor = styled.span`
  padding: 0.5em 0.5em;
  margin-right: 0.5em;
  font-size: 0.7em;
  font-weight: bold;
`;

const LftBtmRightView = styled.span`
  padding: 0.5em 0.5em;
  margin-right: 0.5em;
  font-size: 0.7em;
`;

const LftBtmRightReply = styled.span`
  padding: 0.5em 0.5em;
  margin-right: 0.5em;
  font-size: 0.7em;
`;

const LftBtmRightLike = styled.span`
  padding: 0.5em 0.5em;
  margin-right: 0.5em;
  font-size: 0.7em;
`;
const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 12%;
  height: 100%;
`;

const RightProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 35%;
  height: 35%;
  background: lightgrey;
  font-size: 1.1em;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;

const RightUserName = styled.div`
  margin: 0.2em 0;
  font-weight: bold;
  font-size: 0.9em;
`;

const RightDate = styled.div`
  margin: 0.2em 0;
  font-size: 0.9em;
`;
