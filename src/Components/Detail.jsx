import {useEffect, useState} from "react"
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailMovie } from "../redux/actions/movieAction"

function Detail({token, setToken}){
    const detail = useSelector((state) => state.movie.detail);
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [searchKey, setSearchKey] = useState("")

    useEffect(() => {
        dispatch(getDetailMovie(params.id))
    }, [params.id, dispatch])

    const search = () => (
        navigate(`/search?keywords=${searchKey}`)
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

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

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
            <div>
                <section className="detail">
                <div className="poster"
                 style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${detail?.backdrop_path})`}}>
                    <div className="center-max-size">
                        <div className="poster-content">
                        <span className={"movie-voting"}>{detail?.vote_average} / 10</span>
                            <Button variant='contained' color="error" startIcon={<PlayCircleIcon />}>Watch Trailer</Button>
                            <p>{detail?.genres && detail?.genres?.slice(0,5).map((item, i) => (
                                <Button
                                    key={i}
                                    variant="contained"
                                    color="secondary"
                                    style={{ minWidth:"100px", marginRight:"5px" }}>    
                                    {item.name}
                                </Button>
                            ))}</p>
                            <h1>{detail?.title}</h1>
                            <p>{detail?.overview}</p>
                        </div>
                    </div>
                </div>
                </section>
            </div>
    </div>
    )
}

export default Detail;