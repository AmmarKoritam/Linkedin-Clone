import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PostModal from "./PostModal";
import ArticleItems from "./ArticleItems";
import { getArticlesAPI } from "../service/articlesAPI";
import { useEffect } from "react";

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 1px rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease;
      border-radius: 5px;
      &:hover {
        background: rgba(0, 0, 0, 0.08);
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 8px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background: white;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
        font-size: 14px;
        &:hover {
          background: rgba(0, 0, 0, 0.08);
        }
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px;
        }
        span {
          color: #70b5f9;
          margin-top: 2px;
        }
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 70px;
  }
`;

const EmtpyPosts = styled.p`
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  background-color: #fff;
  width: max-content;
  margin: 60px auto;
  padding: 20px 40px;
  border-radius: 50px;
  &:hover {
    opacity: 0.6;
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

function Main() {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((store) => store.userState.user);
  const { isLoading, articles } = useSelector((store) => store.articelsState);

  function handleClick() {
    setShowModal((prev) => !prev);
  }

  useEffect(function () {
    getArticlesAPI();
  }, []);

  return (
    <Container>
      <ShareBox>
        <div>
          {user && user?.photoURL ? (
            <img src={user?.photoURL} alt="user photo" />
          ) : (
            <img src="/images/user.svg" alt="empty photo" />
          )}
          <button onClick={handleClick} disabled={isLoading}>
            Start a post
          </button>
        </div>

        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="photo icon" />
            <span>Photo</span>
          </button>

          <button>
            <img src="/images/video-icon.svg" alt="video icon" />
            <span>Video</span>
          </button>

          <button>
            <img src="/images/event-icon.svg" alt="event icon" />
            <span>Event</span>
          </button>

          <button>
            <img src="/images/article-icon.svg" alt="article icon" />
            <span>Write Article</span>
          </button>
        </div>
      </ShareBox>

      {articles?.length === 0 ? (
        <EmtpyPosts>There are no articles</EmtpyPosts>
      ) : (
        <Content>
          {isLoading && <img src="images/loader.svg" alt="loading icon" />}

          {articles?.length > 0 &&
            articles.map((article, index) => (
              <ArticleItems article={article} key={index} />
            ))}
        </Content>
      )}

      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
}

export default Main;
