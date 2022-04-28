import Title from "../Title";
import Search from "../Search";
import History from "../History";

import { useState, useRef, useEffect } from "react";

import "./index.scss";

export default function Home() {
  let [isHistory, setIsHistory] = useState(true);
  let [historyList, setHistoryList] = useState([]);
  let search = useRef();
  const childFunc = useRef(null);
  // 从localStorage获取历史记录
  useEffect(() => {
    let result = localStorage.getItem("historyList");
    if (result) {
      setHistoryList(JSON.parse(result));
    }
  }, []);

  // 显示历史组件
  function showHistory() {
    setIsHistory(true);
  }
  // 隐藏历史组件
  function hideHistory() {
    setIsHistory(false);
  }
  // 添加历史记录
  function addHistory(item) {
    setHistoryList((arr) => {
      arr = arr.filter((i) => i !== item);
      arr.unshift(item);
      localStorage.setItem("historyList", JSON.stringify(arr));
      return arr;
    });
  }
  // 删除历史记录
  function delHistory(title) {
    let newArr = historyList.filter((item) => item !== title);
    setHistoryList(newArr);
    localStorage.setItem("historyList", JSON.stringify(newArr));
  }
  // 接受history组件的数据，再操作history的兄弟组件search
  function getFromHistory(item) {
    childFunc.current(item);
  }
  return (
    <div id="home">
      <Title></Title>
      <Search
        ref={search}
        showHistory={showHistory}
        hideHistory={hideHistory}
        addHistory={addHistory}
        childFunc={childFunc}
      ></Search>
      {isHistory &&
        historyList.map((item, index) => (
          <History historyTitle={item} key={index} delHistory={delHistory} getFromHistory={getFromHistory}></History>
        ))}
    </div>
  );
}
