import { Button, Col, Divider, Row, Segmented, Space } from 'antd'
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout'
import React, { ReactNode } from 'react'
import InputSearch from '../components/InputSearch'
import { MENU_MOVIE, VIEW_PORT } from '../constants/enums'
import { AppstoreOutlined, PlayCircleOutlined, BarsOutlined, StarFilled, DownloadOutlined, MenuOutlined } from '@ant-design/icons'
import { useViewModeContext } from '../hooks/useViewPort'
import { Typography } from 'antd';
import { Link } from "react-router-dom";
import './index.css';


const { Title } = Typography;

interface LayoutProps {
    children?: ReactNode
}

const MovieLayout = ({ children }: LayoutProps) => {
    const { setViewMode, setMenuMovie, menuMovie } = useViewModeContext();

    const segmentedOptions = [
        {
            label: VIEW_PORT.LIST,
            value: VIEW_PORT.LIST,
            icon: <BarsOutlined />,
        },
        {
            label: VIEW_PORT.GRID,
            value: VIEW_PORT.GRID,
            icon: <AppstoreOutlined />,
        },
    ]

    return (
        <Layout>
            <Header>
                <Row gutter={[16, 16]} justify="center" align="middle">
                    <Col xs={0} sm={8} md={8} lg={8} xl={4} >
                        <Title level={1} style={{ fontSize: "40px", color: "#ED4545", marginBottom: 0 }}>BestFilms</Title>
                    </Col>
                    <Col xs={4} sm={0} md={0} lg={0} xl={0} >
                        <MenuOutlined style={{ color: "white", fontSize: 20 }} />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={4} >
                        <Link to="#" onClick={() => setMenuMovie(MENU_MOVIE.PLAYING_NOW)} className={menuMovie === MENU_MOVIE.PLAYING_NOW ? "selectedMenu" : ""}>
                            <Title level={4} style={{ color: "white" }}> <PlayCircleOutlined style={{ color: "#1677ff", paddingRight: 4, fontSize: 16 }} />Now Playing</Title>
                        </Link>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={4} >
                        <Link to="#" onClick={() => setMenuMovie(MENU_MOVIE.TOP_RATED)} className={menuMovie === MENU_MOVIE.TOP_RATED ? "selectedMenu" : ""}>
                            <Title level={4} style={{ color: "white" }}><StarFilled style={{ color: "yellow", paddingRight: 4, fontSize: 16 }} />Top Rated</Title>
                        </Link>
                    </Col>
                    <Col xs={20} sm={16} md={16} lg={16} xl={8} style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>s
                        <InputSearch />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={4}>
                        <Segmented
                            options={segmentedOptions}
                            defaultValue={VIEW_PORT.GRID}
                            onChange={(value: any) => setViewMode(value)}
                        />
                    </Col>
                </Row>
            </Header>
            <Layout>
                <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", display: "flex", top: "73%", width: "60%", left: "4%", zIndex: 100 }} >
                        <Button style={{ marginRight: 20 }} type="primary" icon={<PlayCircleOutlined />} size="large">  Watch now </Button>
                        <Button style={{ background: "#ED4545" }} type="primary" icon={<DownloadOutlined />} size="large">  Download </Button>
                    </div>
                    <img src="./banner.jpg" alt='banner' style={{ width: "100%" }} />
                </div>
                <Content style={{ background: "#001529", padding: 20, minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</Content>
            </Layout>
            <Footer style={{ background: "#131A22", padding: 60 }} className='footer'>
                <Row gutter={[16, 16]} justify="center" align="middle">
                    <Col lg={6} md={8} xs={24} sm={12}>
                        <Space direction='vertical' align='start' style={{ width: "80%" }} >
                            <Typography.Link style={{ fontSize: "16px" }}>Get to Know Us</Typography.Link>
                            <Typography.Link>Careers</Typography.Link>
                            <Typography.Link>Blog</Typography.Link>
                            <Typography.Link>About BestFilms</Typography.Link>
                        </Space>
                    </Col>
                    <Col lg={6} md={8} xs={24} sm={12}>
                        <Space direction='vertical' align='start' style={{ width: "80%" }} >
                            <Typography.Link style={{ fontSize: "16px" }}>Make Money with Us</Typography.Link>
                            <Typography.Link>Sell movies at BestFilms</Typography.Link>
                            <Typography.Link>More products with us</Typography.Link>
                            <Typography.Link>Become an Affiliate</Typography.Link>
                        </Space>
                    </Col>
                    <Col lg={6} md={8} xs={24} sm={12} >
                        <Space direction='vertical' align='start' style={{ width: "80%" }}>
                            <Typography.Link style={{ fontSize: "16px" }}>Let Us Help You</Typography.Link>
                            <Typography.Link>Your Account</Typography.Link>
                            <Typography.Link>Your Favourite movies</Typography.Link>
                            <Typography.Link>Help</Typography.Link>
                        </Space>
                    </Col>
                    <Col lg={6} md={8} xs={24} sm={12}>
                        <Space direction='vertical' align='start' style={{ width: "80%" }}>
                            <Typography.Link style={{ fontSize: "16px" }}>Contact us</Typography.Link>
                            <Typography.Link>Via Phone</Typography.Link>
                            <Typography.Link>Via Email</Typography.Link>
                            <Typography.Link>Via Social media</Typography.Link>
                        </Space>
                    </Col>
                </Row>
            </Footer>
        </Layout >
    )
}

export default MovieLayout