import React, { Suspense, useEffect, useState } from 'react'
import { getMovies } from '../../actions'
import { MoviesResponse } from '../../constants/interface'
import { Avatar, Col, message, Rate, Row, Skeleton, Spin, Typography } from 'antd';
import List from 'antd/es/list';
import { useViewModeContext } from '../../hooks/useViewPort';
import Card from '../Card'
import { VIEW_PORT } from '../../constants/enums';
import { EyeOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography;

const Movies = () => {
    const [movies, setMovies] = useState<MoviesResponse[]>([])
    const [initLoading, setInitLoading] = useState<boolean>(true)
    const { viewMode } = useViewModeContext();

    const getMoviesList = async () => {
        try {
            const res = await getMovies()
            setMovies(res?.data?.results || [])
        } catch (error: any) {
            message.error(error?.message || "Something went wrong")
        } finally {
            setInitLoading(false)
        }
    }
    useEffect(() => {
        getMoviesList()
    }, [])

    return (
        <>
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
        </>
    )
}

export default Movies