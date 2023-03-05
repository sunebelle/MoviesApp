import React, { useEffect, useState } from 'react'
import { getMovies } from '../../actions'
import { MoviesResponse } from '../../constants/interface'
import Card from '../Card'
import { message } from 'antd';
import List from 'antd/es/list';
import { useViewModeContext } from '../../hooks/useViewPort';

const Movies = () => {
    const [movies, setMovies] = useState<MoviesResponse[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { viewMode } = useViewModeContext();

    const getMoviesList = async () => {
        try {
            setLoading(true)
            const res = await getMovies()
            setMovies(res?.data?.results || [])
        } catch (error: any) {
            message.error(error?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getMoviesList()
    }, [])

    return (
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 6,
            }}
            loading={loading}
            dataSource={movies}
            renderItem={(item) => (
                <List.Item style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Card movie={item} />
                </List.Item>
            )}
        />
    )
}

export default Movies