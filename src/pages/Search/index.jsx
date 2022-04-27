import "./index.scss";
import { useState, useRef, forwardRef, useEffect } from "react";

import Movie from "../Movie";

const axios = require("axios");

export default forwardRef(function Search(props, ref) {
  const [userInput, setUserInput] = useState("");
  const [dataList, setDataList] = useState([]);
  const [count, setCount] = useState(0);
  const [footerShowed, setFooterShowed] = useState(true);
  const inp = useRef();
  useEffect(() => {
    props.childFunc.current = complex;
  });
  // 复杂通信回调
  function complex(item) {
    inp.current.value = item;
    userSearch();
    inp.current.focus();
  }
  // 输入事件
  function userSearch(e) {
    setFooterShowed(true);
    let input = inp.current.value;
    setUserInput(input);
    if (input) {
      axios.get("http://localhost:3000/db.json").then((res) => {
        const regexp = new RegExp(input);
        let result = res.data.filter((x) => regexp.test(x.title));
        setCount(result.length);
        setDataList(result.slice(0, 3));
      });
      props.hideHistory();
    } else {
      setDataList([]);
      props.showHistory();
    }
  }
  // 删除logo，删除输入内容
  function clearInput() {
    setUserInput("");
    setDataList([]);
    inp.current.value = "";
    props.showHistory();
  }
  // 回车事件，添加历史记录
  function handleKeyDown(e) {
    let input = e.target.value;
    if (e.key === "Enter" && input) {
      props.addHistory(input);
      showAllResult();
    }
  }
  // 显示全部搜索结果
  function showAllResult() {
    props.addHistory(userInput);
    axios.get("http://localhost:3000/db.json").then((res) => {
      const regexp = new RegExp(userInput);
      let result = res.data.filter((x) => regexp.test(x.title));
      setDataList(result);
      setFooterShowed(false);
    });
  }
  return (
    <div className="search-mod">
      <div id="search">
        <div className="input-container">
          <img
            className="search-logo"
            src="https://s0.meituan.net/bs/myfe/canary/file/apollo/images/search.png"
            alt=""
          />
          <input
            className="input"
            ref={inp}
            type="text"
            placeholder="搜电影、搜影院"
            onInput={(e) => userSearch(e)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          {userInput && (
            <img
              className="cancel-logo"
              src="https://s0.meituan.net/bs/?f=myfe/canary:/static/deploy/images/close.png"
              alt=""
              onClick={() => clearInput()}
            />
          )}
        </div>
        <div className="cancel">取消</div>
      </div>
      {dataList.length !== 0 && (
        <div className="search-res">
          <h3 className="res-title">电影/电视剧/综艺</h3>
          <div className="movie-container">
            {dataList.map((item, index) => {
              return <Movie movieItem={item} key={index} />;
            })}
          </div>
          {footerShowed ? (
            <div className="res-footer" onClick={() => showAllResult()}>
              按回车，查看全部{count}部影视剧
            </div>
          ) : (
            <div className="res-footer">已显示全部结果</div>
          )}
        </div>
      )}
    </div>
  );
});

// function Test() {
//   return <div>{dataList.length <= 3 ? <div className="res-footer">已显示全部结果</div> : ""}</div>;
// }
