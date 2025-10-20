import styled from "styled-components";
import ReactPlayer from "react-player";

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 1px rgb(0 0 0 / 20%);
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(2),
        &:nth-child(3) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    ouline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      align-items: center;
      border: none;
      background-color: white;
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  flex-wrap: wrap;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: rgba(0, 0, 0, 0.6);
    border: none;
    background-color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s;
    width: calc(100% / 4);
    height: 60px;
    justify-content: center;

    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
        margin-top: 3px;
        font-weight: 600;
      }
    }
  }
`;

function ArticleItems({ article }) {
  return (
    <Article>
      <SharedActor>
        <a>
          <img src={article.actor.image} alt="user image" />
          <div>
            <span>{article.actor.title}</span>
            <span>{article.actor.description}</span>
            <span>{article.actor.data.toDate().toLocaleDateString()}</span>
          </div>
        </a>
        <button>
          <img src="/images/ellipsis.svg" alt="ellipsis icon" />
        </button>
      </SharedActor>

      <Description>{article.description}</Description>

      <SharedImg>
        <a>
          {!article?.shareImage && article?.video ? (
            <ReactPlayer width="100%" height="400px" src={article.video} />
          ) : (
            article.shareImage && <img src={article.shareImage} alt="image" />
          )}
        </a>
      </SharedImg>

      <SocialCounts>
        <li>
          <button>
            <img src="/images/like-icon-posts.svg" alt="like icon" width="30" />
            <img src="/images/heart-icon.svg" alt="heart icon" width="30" />
            <span style={{ marginLeft: "10px" }}> 50</span>
          </button>
        </li>

        <li>
          <a>{article.comments} comments</a>
        </li>

        <li>
          <a>0 share</a>
        </li>
      </SocialCounts>

      <SocialActions>
        <button>
          <img src="/images/like-icon.svg" alt="like-icon" />
          <span>Like</span>
        </button>

        <button>
          <img src="/images/comment-icon.svg" alt="comment-icon" />
          <span>Comment</span>
        </button>

        <button>
          <img src="/images/share-icon.svg" alt="share-icon" />
          <span>Share</span>
        </button>

        <button>
          <img src="/images/send-icon.svg" alt="send-icon" />
          <span>Send</span>
        </button>
      </SocialActions>
    </Article>
  );
}

export default ArticleItems;
