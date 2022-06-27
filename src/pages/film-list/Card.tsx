  
  import "./card.css"
  
  interface IProps {
    title: string;
    imdb: string;
    createdAt: string;
    img: string;
  }
  
  export const Card = (props: React.PropsWithChildren<IProps>) => {
    return (
        <div className="movie-card">
        <img
          className="card-img"
          src={"https://image.tmdb.org/t/p/w500" + props.img}
          alt="png"
        />
        <div className="card-body">
          <h4>{props.title}</h4>

          <p>
            IMDB : <span>{props.imdb}</span>{" "}
          </p>

          <p>
            Yayın Tarihi : <span>{props.createdAt}</span>
          </p>
        </div>
      </div>
    );
  };
  