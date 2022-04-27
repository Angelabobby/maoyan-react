import Title from "../Title";
import Search from "../Search";
import History from "../History";

import { useState, useRef, forwardRef } from "react";

import "./index.scss";

export default function Home() {
  let [isHistory, setIsHistory] = useState(true);
  let [historyList, setHistoryList] = useState([]);
  let search = forwardRef();

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
      return arr;
    });
  }
  // 删除历史记录
  function delHistory(title) {
    setHistoryList(historyList.filter((item) => item !== title));
  }
  // 接受history组件的数据，再操作history的兄弟组件search
  function getFromHistory(item) {
    // setBus(item);
    search.current.inp.current.value = item;
    search.current.userSearch();
  }
  // 传数据给search组件
  // function toSearch() {
  //   search.current.inp.current.value = bus;
  //   search.current.userSearch();
  // }
  return (
    <div id="home">
      <Title></Title>
      <Search ref={search} showHistory={showHistory} hideHistory={hideHistory} addHistory={addHistory}></Search>
      {isHistory &&
        historyList.map((item, index) => (
          <History historyTitle={item} key={index} delHistory={delHistory} getFromHistory={getFromHistory}></History>
        ))}
    </div>
  );
}
