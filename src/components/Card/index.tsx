import { Col, Rate, Row, Skeleton, Space, Spin } from 'antd';
import Card from 'antd/es/card/Card';
import Meta from 'antd/es/card/Meta';
import React, { Suspense } from 'react'
import { MoviesResponse } from '../../constants/interface'
import './index.css';
import { EyeOutlined } from '@ant-design/icons'
import { Typography } from 'antd';
import moment from "moment"
import { VIEW_PORT } from '../../constants/enums';
import { useViewModeContext } from '../../hooks/useViewPort';

export interface MovidesProps {
    movie: MoviesResponse,
    loading: boolean
}

const { Paragraph, Title } = Typography;

const MovieCard = (props: MovidesProps) => {
    const { title, poster_path, vote_average, vote_count, overview, original_title, original_language, release_date } = props?.movie
    const { viewMode } = useViewModeContext();

    const image = (src: string) => {
        if (src) return `https://image.tmdb.org/t/p/w780${src}`
        return "https://tse3.mm.bing.net/th?id=OIP.1umjRUVLTbPQCPVU_q1HPgHaK-&pid=Api&P=0&w=300&h=300"
    }

    const ListCard = () => (
        <Row align="top" justify="center" style={{ color: "white", textAlign: "left" }} className="list-card">
            <Col xs={24} sm={12} md={10} lg={6}>
                <img style={{ width: "100%", height: "400px", cursor: "pointer" }} src={image(poster_path)} alt={title} loading="lazy" />
            </Col>
            <Col xs={0} sm={12} md={14} lg={18} style={{ paddingRight: "5%" }} >
                <Title level={4} style={{ color: "white", paddingLeft: 0 }}>{title}</Title>
                <p >Original title: {original_title}</p>
                <p >Original language: {original_language}</p>
                <p>Release date: {moment(release_date || "05/03/2023").format('L')}</p>
                <span >{overview}</span>
                <div>
                    <span className="vote" style={{ marginRight: 20 }}><EyeOutlined />{`(${vote_count})`}</span>
                    <Rate allowHalf defaultValue={vote_average} disabled />
                </div>
            </Col>
        </Row>
    )

    const GridCard = () => (
        <Card
            hoverable
            style={{ width: 300 }}
            cover={<img src={image(poster_path)} alt={title} loading="lazy" />}
            className="movie-card"
        >
            <Skeleton loading={props?.loading} active>
                <Meta title={
                    <div className='movie-content'>
                        <span className="vote"><EyeOutlined style={{ color: "#1677ff" }} />{`(${vote_count})`}</span>
                        <Rate allowHalf defaultValue={vote_average} disabled />
                    </div>
                }
                    description={
                        <p className="overview">{overview}</p>
                    } />
            </Skeleton>
        </Card>
    )

    if (viewMode === VIEW_PORT.GRID) {
        return <GridCard />
    }
    return <ListCard />
}

export default MovieCard





