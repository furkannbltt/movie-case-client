import { useState, useEffect, useRef, useCallback } from "react";
import * as API from "../api";


const InfiniteSearch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [query, setQuery] = useState("");
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {
        setData([])
    }, [query])


    useEffect(() => {
        if (query.length > 0) {
            setIsLoading(true);
            const data = {
                query: query,
                pageNum: pageNum
            }
            API.searchMovie(data)
                .then((res) => {
                    setData((prev) => {
                        return [...new Set([...prev, ...res.data.results])];
                    });
                    setHasMore(res.data.results.length > 0);
                    setIsLoading(false);
                })
                .catch((err) => {
                    alert("error")
                });

        } else {
            setIsLoading(true);
            API.getMovies(pageNum)
                .then((res) => {
                    // @ts-ignore
                    setData((prev) => {
                        return [...new Set([...prev, ...res.data.results])];
                    });
                    setHasMore(res.data.results.length > 0);
                    setIsLoading(false);
                })
                .catch((err) => {
                    alert("error")
                });

        }
    }, [query, pageNum]);
  
    const observer = useRef();
    const lastBookElementRef = useCallback(
      (node) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNum((prev) => prev + 1);
          }
        });
        if (node) observer.current.observe(node);
      },
      [isLoading, hasMore]
    );
  
    const handleChange = (e) => {
      setQuery(e.target.value);
      setPageNum(1);
    };
  
    return { isLoading, data, hasMore,handleChange,lastBookElementRef,query };
}

export default InfiniteSearch;
