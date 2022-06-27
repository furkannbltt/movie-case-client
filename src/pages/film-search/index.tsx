import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import InfiniteSearch from "../../utils/InfiniteSearch";
import { Card } from "../film-list/Card";

export const SearchPage = () => {
  const { isLoading, data, handleChange, lastBookElementRef, query } =
    InfiniteSearch();

  return (
    <div>
      <input className="form-control form-control-sm" style={{width:"10rem",marginLeft:"1rem"}} type="text" placeholder="Search" aria-label="Search" onChange={handleChange} value={query} />
      <div className="card-list">
        {data.map((movie: any, i: number) => {
          if (data.length === i + 1) {
            return (
              <div key={i} ref={lastBookElementRef}>
                <Link key={movie.id} to={"/film-detail/" + JSON.stringify(movie.id)}>
                  <Card
                    img={movie.poster_path}
                    title={movie.title}
                    imdb={movie.vote_average}
                    createdAt={movie.release_date}
                  />
                </Link>
                ;
              </div>
            );
          } else {
            return (
              <Link
                key={movie.id}
                to={"/film-detail/" + JSON.stringify(movie.id)}
              >
                <Card
                  img={movie.poster_path}
                  title={movie.title}
                  imdb={movie.vote_average}
                  createdAt={movie.release_date}
                />
              </Link>
            );
          }
        })}
      </div>
      <div  className="text-center">{isLoading && <Spinner animation="border" variant="danger" role="status">
      </Spinner>}</div>
    </div>
  );
};
