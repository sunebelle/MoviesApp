import React, { Suspense, useEffect, useState, useCallback } from 'react'
import { getMovies, getTopRatedMovies } from '../../actions'
import { MoviesResponse } from '../../constants/interface'
import { Avatar, Col, message, Rate, Row, Skeleton, Spin, Typography } from 'antd';
import List from 'antd/es/list';
import { useViewModeContext } from '../../hooks/useViewPort';
import Card from '../Card'
import { MENU_MOVIE, VIEW_PORT } from '../../constants/enums';

const Movies = () => {
    const [movies, setMovies] = useState<MoviesResponse[]>([])
    const [initLoading, setInitLoading] = useState<boolean>(true)
    const { viewMode, menuMovie } = useViewModeContext();
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [touchY, setTouchY] = useState<number>(0)
    const [translateY, setTranslateY] = useState<number>(0)
    const [reachBottom, setReachBottom] = useState<boolean>(false)

    const getMoviesList = useCallback(async () => {
        try {
            const res = await getMovies()
            setMovies(res?.data?.results || [])
            // message.success("Get movie list successfully")
        } catch (error: any) {
            message.error(error?.message || "Something went wrong")
        } finally {
            setInitLoading(false)
        }
    }, [])

    const getTopRatedMoviesList = useCallback(async () => {
        try {
            const res = await getTopRatedMovies()
            setMovies(res?.data?.results?.filter((el: MoviesResponse) => el?.id !== 995133) || [])
            // message.success("Get movie list successfully")
        } catch (error: any) {
            message.error(error?.message || "Something went wrong")
        } finally {
            setInitLoading(false)
        }
    }, [])

    useEffect(() => {
        if (menuMovie === MENU_MOVIE.PLAYING_NOW) getMoviesList()
        if (menuMovie === MENU_MOVIE.TOP_RATED) getTopRatedMoviesList()
    }, [menuMovie])


    const handleTouchStart = (event: any) => {
        const touchY = event.touches[0].clientY;
        setTouchY(touchY);

        if (window.scrollY === 0) {
            setRefreshing(true);
        }
    };

    const handleTouchMove = (event: any) => {
        if (refreshing) {
            const distance = event.touches[0].clientY - touchY;

            if (distance > 0) {
                setTranslateY(distance);
            }
        }
    };

    const handleTouchEnd = () => {
        if (refreshing) {
            setRefreshing(false);
            setTranslateY(0);
            getMoviesList();
        }
    };

    const handleScroll = () => {
        const bottom =
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
        if (window.scrollY === 0) {
        // if (window.scrollY === 0 || bottom) {
            setRefreshing(true);
            if (bottom) setReachBottom(true)
        } else {
            setRefreshing(false);
            setReachBottom(false)
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="pull-to-refresh">
            {refreshing && !reachBottom && (
                <Spin size='small' />
            )}
            <div
                style={{ transform: `translateY(${translateY}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
            {viewMode === VIEW_PORT.GRID ? (
                <List
                    loading={initLoading}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 3,
                        xl: 4,
                        xxl: 6,
                    }}
                    dataSource={movies}
                    renderItem={(item) => (
                        <List.Item style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                            <Card movie={item} loading={initLoading} />
                        </List.Item>
                    )}
                />
            ) : (
                <List
                    loading={initLoading}
                    dataSource={movies}
                    renderItem={(item) => (
                        <List.Item style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }} >
                            <Card movie={item} loading={initLoading} />
                        </List.Item>
                    )}
                />
            )}
            </div>
        </div>
    )
}

export default Movies