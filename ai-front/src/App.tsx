import React, { useState } from "react";
import "./App.css";
import axios from "axios";
interface ImageDta {
  image: string;
  ssim: number;
}

const url = "http://127.0.0.1:5000/api";
// "https://alb.m-ak-engineering.com/generateImage",
const headers = {
  "Content-type": "application/json",
  Accept: "application/json",
};

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState<ImageDta>({
    image: "",
    ssim: 0,
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const data = { post_text: text };
      await axios
        .post(`${url}/generateImage`, data, {
          headers,
          timeout: 600000,
        })
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .then(() => {
          console.log("成功");
          console.log(data);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log("エラーです");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>画像生成アプリ</h1>
        <form onSubmit={handleSubmit}>
          <textarea onChange={(e) => setText(e.target.value)}></textarea>
          <div>
            <input type="submit" value="生成する" />
          </div>
        </form>
        <div>
          {data && (
            <div>
              <img
                width="500px"
                src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-rZO97Zc8XdnAcJKVucAdm3jR/user-lbtEDlHuxrU0G3N3IJ81XkcL/img-4DTpvbrjshUj1DDmA6VrpzSu.png?st=2024-03-03T15%3A19%3A15Z&se=2024-03-03T17%3A19%3A15Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-03T15%3A24%3A17Z&ske=2024-03-04T15%3A24%3A17Z&sks=b&skv=2021-08-06&sig=mJr3NczTnmvUuRSw6an4sqgbG0uGpxBe8IDwK1Kpd4k%3D"
                alt=""
              />
              <p>{data.ssim}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
