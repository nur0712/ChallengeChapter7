import {useEffect, useState} from "react"
import Movie from "./Movie"
import { Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getSearchKey } from "../redux/actions/movieAction"

function Search({token, setToken}) {
    const SearchKey = useSelector((state) => state.movie.SearchKey);
    const [searchKey, setSearchKey] = useState("")
    const [noOfElement, setnoOfElement] = useState(4)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const query = searchParams.get('keywords')
    const dispatch = useDispatch()

    const slice = SearchKey?.results?.slice(0, noOfElement)

    const showAll = () => {
        setnoOfElement(12)
    }

    const showLess = () => {
        setnoOfElement(4)
    }

    useEffect(() => {
        dispatch(getSearchKey(query))
    }, [query, dispatch])

    const selectMovie = (movie) => {
        navigate(`/detail/${movie.id}`)
    }

    const renderMovies = () => (
        slice?.map(movie => (
            <Movie
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
            />
        ))
    )

    const home = () => (
        navigate("/")
    )

    const login = () => (
        navigate("/login")
    )

    const reg = () => (
        navigate("/register")
    )

    const search = (e) => {
        e.preventDefault()
        navigate(`?keywords=${searchKey}`)
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };
    console.log(searchKey)
    return (
        <div className="App">
            {token ? (<header className="center-max-size header">
                <span className={"brand"} onClick={home}><h2>Movielist</h2></span>
                <form className="form" onSubmit={search}> 
                    <input className="search" type="text" id="search" placeholder="Search Movie"
                           onInput={(event) => setSearchKey(event.target.value)}/>
                    <button className="submit-search" type="submit"><SearchIcon fontSize="small" /></button>
                </form>
                <span className={"lojin"}>
                <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
                </span>
            </header>) : (<header className="center-max-size header">
                <span className={"brand"} onClick={home}><h2>Movielist</h2></span>
                <form className="form" onSubmit={search}> 
                    <input className="search" type="text" id="search" placeholder="Search Movie"
                           onInput={(event) => setSearchKey(event.target.value)}/>
                    <button className="submit-search" type="submit"><SearchIcon fontSize="small" /></button>
                </form>
                <span className={"lojin"}>
                <Button variant="outlined" color="error" onClick={login}>Login</Button>
                <Button variant="contained" color="error" onClick={reg}>Register</Button>
                </span>
            </header>)}
            {SearchKey ?
                <main>
                    <div className={"center-max-size title"}><h2>Search Result "{query}"</h2>
                    {noOfElement===12 ? (<Button color="error" onClick={showLess}>Show Less Movie</Button>) : 
                    (<Button color="error" onClick={showAll}>Show All Movie</Button>)}</div>
                    <div className={"center-max-size container"}>
                        {renderMovies()}
                    </div>
                </main>
                : 'Sorry, no movies found'}
        </div>
    );
}

export default Search;
