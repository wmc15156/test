import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://3.35.233.255:8000";
  axios.defaults.withCredentials = true;
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [id, setId] = useState("");

  const onChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }
    axios
      .post("/posts", { data: content })
      .then((res) => {
        alert("생성 성공 새로고침 후 데이터 확인");
      })
      .catch((err) => {
        alert("error 발생");
      });
  };

  const onRemoveHandler = (id) => () => {
    axios
      .delete(`/posts/${id}`)
      .then((res) => {
        alert("삭제성공 새로고침 후 데이터 확인");
      })
      .catch((err) => {
        alert("error 발생");
      });
  };

  const onLookupHandler = () => {
    const idArray = [];
    posts.forEach((post) => {
      idArray.push(post.id);
    });

    alert(`조회 가능 한 ID: ${idArray}`);
  };

  const onIssueToken = () => {
    axios
      .get(`/posts/${id}/token`)
      .then((res) => {
        console.log(res);
        console.log(123123123);
        alert(`토큰 발행완료(localstorage 저장) ${res.data.token}`);
        localStorage.setItem("token", JSON.stringify(res.data.token));
      })
      .catch((err) => {
        alert(`${err.response.data}`);
      });
  };

  useEffect(() => {
    axios.get("/posts").then((res) => {
      setPosts(res.data.data);
    });
  }, []);

  return (
    <div>
      <div
        style={{
          width: "580px",
          margin: "0 auto",
          marginBottom: "300px",
          textAlign: "center",
        }}
      >
        <h2>현재 DB에 있는 데이터</h2>
        <ul style={{ padding: 0 }}>
          {posts.map((post, i) => (
            <li
              key={i}
              style={{
                width: "580px",
                display: "flex",
                listStyle: "none",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              {`id: ${post.id} content: ${post.content}`}
              <button onClick={onRemoveHandler(post.id)}>remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          width: "580px",
          margin: "0 auto",
          marginBottom: "100px",
          textAlign: "center",
        }}
      >
        <h2>DB에 데이터 생성</h2>
        <form onSubmit={onSubmitHandler}>
          <input
            placeholder={"내용을 입력해주세요"}
            onChange={onChangeHandler}
            value={content}
          />
          <button>create</button>
        </form>
      </div>

      <div
        style={{
          width: "580px",
          margin: "0 auto",
          marginBottom: "100px",
          textAlign: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          토큰 발급 (DB에 있는 데이터 확인 후 있으면 token 발행)
        </h2>
        <h4>
          id 조회 버튼 클릭 후 id 확인 후 입력 token issue 버튼으로 token
          발행가능
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <input
            placeholder={"id만 입력해주세요(ex: 1)"}
            onChange={onChangeId}
            value={id}
          />
          <button onClick={onIssueToken}>token issue</button>
        </div>
        <div>
          <button onClick={onLookupHandler}>id 조회</button>
        </div>
      </div>
    </div>
  );
}

export default App;
