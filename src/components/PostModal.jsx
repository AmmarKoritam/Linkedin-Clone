import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactPlayer from "react-player";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 99%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
  button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  align-items: center;
  h2 {
    line-height: 1.5;
    font-weight: 400;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.6);
  }
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    background: none;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
  svg,
  img {
    pointer-events: none;
  }
`;

const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    line-height: 1.5;
    font-size: 16px;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 16px 16px;
  height: 30px;
`;

const AssetButton = styled.button`
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-size: 14px;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  display: grid;
  place-items: center;
  ${AssetButton} {
    svg,
    img {
      margin-right: 5px;
    }
    padding: 10px;
    height: 30px;
    border-radius: 30px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgb(235,235,235)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgb(0,0,0,0.25)" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  font-size: 16px;
  border-radius: 30px;
  &:hover {
    background: ${(props) => (props.disabled ? "" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    border: none;
    line-height: 1.5;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
  display: block;
  margin-bottom: "15px";
`;

function PostModal({ showModal, handleClick, listenCapturing = true }) {
  const [editorText, setEditorText] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const ref = useRef();

  const textAreaRef = useRef(null);

  const user = useSelector((store) => store.userState.user);

  useEffect(() => {
    if (showModal && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [showModal]);

  function reset() {
    setEditorText("");
    setAssetArea("");
    setShareImage("");
    setVideoLink("");
    handleClick();
  }

  function handleChange(e) {
    const image = e.target.files[0];

    if (!image) {
      alert("Please select an image file!");
      return;
    }

    if (!image.type.startsWith("image/")) {
      alert(`Not an image! The file type is ${image.type}`);
      return;
    }

    setShareImage(image);
  }

  function switchAssetArea(filed) {
    setShareImage("");
    setVideoLink("");
    setAssetArea(filed);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setEditorText("");
        setAssetArea("");
        setShareImage("");
        setVideoLink("");
        handleClick();
      }
    }

    if (showModal) {
      document.addEventListener("click", handleClickOutside, listenCapturing);
      return () =>
        document.removeEventListener(
          "click",
          handleClickOutside,
          listenCapturing
        );
    }
  }, [handleClick, listenCapturing, showModal]);

  return (
    <>
      {showModal && (
        <Container>
          <Content ref={ref}>
            <Header>
              <h2>Create a Post</h2>
              <button type="button" onClick={reset} aria-label="Close menu">
                <img src="/images/close-icon.svg" alt="close menu" />
              </button>
            </Header>

            <ShareContent>
              <UserInfo>
                {user ? (
                  <img src={user.photoURL} alt="user photo" />
                ) : (
                  <img src="/images/user.svg" alt="empty photo" />
                )}
                <span> {user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="what do you want to talk about"
                  ref={textAreaRef}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <Input
                      type="file"
                      name="image"
                      id="file"
                      onChange={handleChange}
                    />
                    <Label htmlFor="file">
                      Click here to select an image to share
                    </Label>
                    {shareImage && (
                      <img
                        src={URL.createObjectURL(shareImage)}
                        alt="image post"
                      />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        style={{ width: "100%", height: "30px" }}
                        type="text"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        placeholder="Please input a video link"
                      />
                      {videoLink && (
                        <ReactPlayer
                          width="100%"
                          height="300px"
                          src={videoLink}
                          controls
                        />
                      )}
                    </>
                  )
                )}
              </Editor>
            </ShareContent>

            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/share-image.svg" alt="upload image" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/share-video.svg" alt="upload image" />
                </AssetButton>
              </AttachAssets>

              {/* <PostButton disabled={!editorText && !shareImage && !videoLink}> */}
              <PostButton disabled={!editorText}>Post</PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
}

export default PostModal;
