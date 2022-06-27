/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as API from "../../api";
import { useState, useContext } from 'react';
import "./detail.css"
import AuthContext from '../../store/AuthContext';
import { FaFrown, FaGrinStars } from "react-icons/fa";
import Comments from './Comments';
import { Button, Form, FormControl } from 'react-bootstrap';

export const FilmDetail = () => {
    const { id } = useParams()
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const [movies, setMovies] = useState<any>(null)
    const [isFavorite, setIsFavorite] = useState<any>(false)

    const getFavoriteRequest = () => {
        API.getFavorites(context.auth.email)
            .then((result) => {
                const element = result?.data?.user?.userFavorites.find((element: any) => element.id === id)
                setIsFavorite(typeof element === "object" ? true : false)
            })
            .catch((error) => {
                alert("error");
            })
    }
    const handleFavoriteMovie = () => {
        if(context.auth.email){
        const data = {
            id: id,
            email: context.auth.email
        }
        API.favoriteMovie(data)
            .then((result) => {
                getFavoriteRequest()
            })
            .catch((error) => {
                alert("error");
            })}
            else{
                alert("Film favorilemek için giriş yapmalısınız");
                navigate("/signin")
            }
    }

    useEffect(() => {
        API.getMoviesDetail(id)
            .then((result) => {
                setMovies(result.data)
            })
            .catch((error) => {
                alert("error");
            })
    }, [id])

    useEffect(() => {
        getFavoriteRequest()
    }, [getFavoriteRequest])

    const shareMovie = (e: any) => {
        e.preventDefault()
        if(context.auth.email){
        const data = {
            from: context.auth.email,
            to: e.target.email.value,
            link: window.location.href
        }
        API.sendEmail(data)
            .then(() => {
                e.target.reset();
                alert("Film paylaşıldı.");
            })
            .catch((error) => {
                alert("error");
            })}
            else{
                alert("Film paylaşmak için giriş yapmalısınız");
                navigate("/signin")
            }
    }

    return (movies && <div> <div className="content">
        <div className="content-left">
            <img
                className="poster"
                src={"https://image.tmdb.org/t/p/w500" + movies?.poster_path}
                alt="poster-path"
            />
        </div>
        <div className="content-right">
            <h4>
                {movies?.title}
                <button onClick={() => handleFavoriteMovie()} className={`favorite-button ${isFavorite && "favori"}`}><FaFrown className='true' /><FaGrinStars className='false' /></button>
            </h4>

            <hr />


            <p>
                <strong> IMDB: </strong>
                <span>{movies?.vote_average} </span>
            </p>
            <p>
                <strong>Yapım Tarihi:</strong>{" "}
                <span>{movies?.release_date} </span>
            </p>

            <p>
                <strong> Oylanma: </strong>
                <span>{movies?.vote_count} </span>
            </p>
            <p>
                <strong>Popülarite: </strong>
                <span>{movies?.popularity.toFixed(0)} </span>
            </p>

            <hr />
            <h5>
                <strong> Film Özeti</strong>
            </h5>
            <p>{movies?.overview}</p>
            <p style={{display:"flex", alignItems:"center"}} >
                <strong>Film Paylaş: </strong>
                <Form onSubmit={shareMovie} style={{display:"flex"}}>
                    <FormControl
                        required
                        className='form-control-sm'
                        key="email"
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                    />
                    <Button variant='danger' type="submit">
                        Paylaş
                    </Button>
                </Form>
            </p>
        </div>

    </div>
        <Comments id={id} email={context.auth.email} />
    </div>
    )
}
