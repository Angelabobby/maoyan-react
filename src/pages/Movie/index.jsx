import "./index.scss";

export default function Movie(props) {
  return (
    <div className="movie-item">
      <img className="cover" src={props.movieItem.picUrl} alt="" />
      <div className="info">
        <div className="chn-title">{props.movieItem.title}</div>
        <div className="ori-title">{props.movieItem.oriTitle}</div>
        <div className="category">{props.movieItem.cate}</div>
        <div className="release">{props.movieItem.release}</div>
      </div>
      <div className="score">
        <span className="num">{props.movieItem.score}</span>
        <span className="unit">分</span>
      </div>
    </div>
  );
}
