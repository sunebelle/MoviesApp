import React, { useState } from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

const { Search } = Input;
const InputSearch = () => {
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <Search placeholder="Search movies" size="large" loading={loading} enterButton />
    );
}

export default InputSearch

