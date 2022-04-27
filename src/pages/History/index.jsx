import "./index.scss";

export default function History(props) {
  // 删除历史记录
  function delHistory() {
    props.delHistory(props.historyTitle);
  }
  // 点击历史记录，搜索
  function clickSearch() {
    props.getFromHistory(props.historyTitle);
  }
  return (
    <div id="history">
      <div className="history-item">
        <img
          className="history-icon"
          src="https://s0.meituan.net/bs/myfe/canary/file/apollo/images/search/img/base64/recent-search.png"
          alt=""
        />
        <div className="history-title" onClick={() => clickSearch()}>
          {props.historyTitle}
        </div>
        <img
          className="delete-icon"
          src="https://s0.meituan.net/bs/myfe/canary/file/apollo/images/search/img/base64/delete.png"
          alt=""
          onClick={() => {
            delHistory();
          }}
        />
      </div>
    </div>
  );
}
