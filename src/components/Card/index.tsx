import { Rate, Space } from 'antd';
import Card from 'antd/es/card/Card';
import Meta from 'antd/es/card/Meta';
import React from 'react'
import { MoviesResponse } from '../../constants/interface'
import './index.css';
import { EyeOutlined } from '@ant-design/icons'
import { Typography } from 'antd';

export interface MovidesProps {
    movie: MoviesResponse
}

const { Paragraph } = Typography;

const MovieCard = (props: MovidesProps) => {
    const { title, poster_path, vote_average, vote_count, overview } = props?.movie

    const image = (src: string) => {
        if (src) return `https://image.tmdb.org/t/p/w780${src}`
        return "https://tse3.mm.bing.net/th?id=OIP.1umjRUVLTbPQCPVU_q1HPgHaK-&pid=Api&P=0&w=300&h=300"
    }


    return (
        <Card
            hoverable
            style={{ width: 300 }}
            cover={<img src={image(poster_path)} alt={title} />}
            className="movie-card"
        >
            <Meta title={
                <div className='movie-content'>
                    <span className="vote"><EyeOutlined style={{ color: "#1677ff" }} />{`(${vote_count})`}</span>
                    <Rate allowHalf defaultValue={vote_average} disabled />
                </div>
            }
                description={
                    <p className="overview">{overview}</p>
                } />
        </Card>
    )
}

export default MovieCard





