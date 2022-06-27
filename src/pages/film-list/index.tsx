import * as API from "../../api";
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from './Card';
import { Button, Spinner } from "react-bootstrap";

const Home = () => {
  const [movies, setMovies] = useState<any>([])
  const [pageNum, setPageNum] = useState<number>(1)
  const [isloading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    API.getMovies(pageNum)
      .then((result) => {
        setMovies((prev: any) => {
          return [...new Set([...prev, ...result.data.results])];
        })
        setIsLoading(false)
      })
      .catch((error) => {
        alert("error");
      })
  }, [pageNum])

   
  return (
    <>
      <div className='card-list'>{movies?.map((movie: any) => {
        return (
          <Link key={movie.id} to={`film-detail/${movie.id}`}>
            <Card
              img={movie.poster_path}
              title={movie.title}
              imdb={movie.vote_average}
              createdAt={movie.release_date}
            />
          </Link>
        );
      })}
      </div>
      {!isloading&&<div className="text-center m-5 more-button"><Button variant="success" onClick={() => setPageNum(pageNum + 1)} >Daha fazla gör</Button></div>}
      {isloading&&<div className="text-center m-5"> <Spinner animation="border" variant="danger" role="status">
    </Spinner></div>}</>
      
  )
}

export default Home