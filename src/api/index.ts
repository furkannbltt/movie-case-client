import axios from "axios";

const apiEndPoint = "https://movie-app-produc.herokuapp.com/";

export const signIn = async (data: any) =>
  await axios.post(apiEndPoint + "user/signin", {
    email: data.email,
    password: data.password,
  });
export const signUp = async (data: any) =>
  await axios.post(apiEndPoint + "user/signup", {
    email: data.email,
    password: data.password,
  });

export const favoriteMovie = async (data: any) =>
  await axios.post(apiEndPoint + "user/favorite", {
    email: data.email,
    id: data.id
  });

export const getFavorites = async (email: string) =>
  await axios.post(apiEndPoint + "user/favorites", {
    email: email
  });

export const getComments = async (id: string) =>
  await axios.post(apiEndPoint + "comment", {
    id: id,
  });

export const addComment = async (data: any) =>
  await axios.post(apiEndPoint + "comment/new", {
    sender: data.email,
    id: data.id,
    comment: data.comment
  });

export const getMovies = async (pageNum:number) =>
  await axios.post(apiEndPoint + "films",{
    pageNum:pageNum
  });

export const searchMovie = async (data: any) =>
  await axios.post(apiEndPoint + "films/search", {
    query: data.query,
    pageNum:data.pageNum
  });

export const getMoviesDetail = async (id: any) =>
  await axios.post(apiEndPoint + "films/detail", {
    Id: id,
  });

  export const sendEmail = async (data: any) =>
  await axios.post(apiEndPoint + "user/send-email", {
    from: data.from,
    to:data.to,
    link:data.link
  });



