import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useEffect, useState } from "react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';
import { useNavigate } from 'react-router-dom';



function First() {
    const navigate = useNavigate()
    const handleNavigation = (id, type = 'm') => {
        // Construct the URL with query parameters
        const url = `/about`;

        // Navigate to the specified URL
        navigate(url, { state: { Movies, Shows, id, type } });
    };
    const [searchQuery, setSearchQuery] = useState('');

    const [Movies, setMovies] = useState([])
    const [Shows, setShows] = useState([])
    const getMovies = async () => {
        try {
            await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=true&api_key=270c888e1f149bd091cc6cef96fb175d")
                .then(res => res.json())
                .then(json => setMovies(json.results))
        } catch (err) {
            console.log(err)
        }
    }
    const getShows = async () => {
        try {
            await fetch("https://api.themoviedb.org/3/discover/tv?include_adult=true&api_key=270c888e1f149bd091cc6cef96fb175d")
                .then(res => res.json())
                .then(json => setShows(json.results))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getMovies()
        getShows()
    }, [])

    const searchResult = (e) => {
        setSearchQuery(e.target.value);

    };
    const filteredMovies = searchQuery.trim() !== "" 
    ?Movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())

    ):Movies.filter((movie) => null);

    return (


        <div class="cover">
            {/*<!-- Navigation -->*/}

            <nav class="navbar navbar-expand-lg bg-black bg-opacity-75" data-bs-theme="dark">
                <div class="container-fluid mx-5">
                    <a class="navbar-brand" href="#">
                        <img src="./Assets/img/netflix-logo-png-large.png" alt="Bootstrap" width="120" class="mx-2" />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item mx-3">
                                <a class="nav-link" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item me-3">
                                <a class="nav-link" href="#">TV Shows</a>
                            </li>
                            <li class="nav-item me-3">
                                <a class="nav-link active" href="#">Movies</a>
                            </li>
                            <li class="nav-item me-3">
                                <a class="nav-link" href="#">New & Popular</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">My List</a>
                            </li>

                        </ul>
                        <span class="d-flex mt-2">
                            <div class="input-group mb-3 ">
                                <input type="text" class="form-control bg-black rounded-0 searchlistp " placeholder="Search..." aria-label="Search... " aria-describedby="basic-addon2" onChange={searchResult} />
                                <ul className="bg-black text-white  list-unstyled   searchlistc ">
                                    {filteredMovies.map((movie) => (
                                        <li onClick={() => { handleNavigation(movie.id, 'm') }} key={movie.id} className="m-1">
                                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} height={35} width={35}  className="mx-1"/>


                                            {movie.title}
                                            </li>
                                    ))}
                                </ul>

                                <span class="input-group-text bg-black border border-black" id="basic-addon2" ><i class="bi bi-search"></i></span>
                            </div>

                            <span class="dropdown ms-4 me-5 mt-2">
                                <a class="dropdown-toggle nav-link text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </span>
                        </span>

                    </div>
                </div>
            </nav>

            {/*<!-- Section-01 -->*/}
            <div class="m-1 section">

                <h3 class="text-light">
                    Most Popular
                </h3>

                <div class="">
                    <Swiper

                        slidesPerView={9}
                        spaceBetween={5}
                        modules={[Navigation]}
                        navigation
                        className="mySwiper"
                    >
                        {Movies.map((data) => {
                            return <>
                                <div class="card " >
                                    <SwiperSlide onClick={() => { handleNavigation(data.id, 'm') }}>
                                        <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} class="img-fluid" />

                                    </SwiperSlide>
                                </div>
                            </>

                        })}
                    </Swiper>
                </div>
            </div>

            {/*<!-- Section-02 -->*/}
            <div class="mx-1 mt-4 section">

                <h3 class="text-light">
                    Most Popular
                </h3>

                <div class="">
                    <Swiper
                        slidesPerView={9}
                        spaceBetween={5}
                        modules={[Navigation]}
                        navigation
                        className="mySwiper"
                    >
                        {Shows.map((data) => {
                            return <>
                                console.log(data)
                                <SwiperSlide onClick={() => { handleNavigation(data.id, 't') }}>
                                    <div class="card h-100" >
                                        <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} class="img-fluid" />
                                    </div>
                                </SwiperSlide>
                            </>
                        })}
                    </Swiper>
                </div>
            </div>

        </div>
    )
}
export default First;