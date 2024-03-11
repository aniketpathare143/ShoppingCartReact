import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Menu } from 'semantic-ui-react'

const Category = (props) => {
    const [visible, setVisible] = useState(false)
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [categoryClicked, setCategoryClicked] = useState(false);
    //props.onSet(33);

    const handleCategoryClick = (e) => {       
        setCategoryClicked(true);
        props.onSet(e, categoryClicked);
    };

    useEffect(() => {
        //setCategoryClicked(false);
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5087/api/category');
                setCategory(response.data);
                //console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Menu vertical>
                <Menu.Item header>Categories</Menu.Item>
                {
                    category.map((item) => (
                        <>
                            <Menu.Item value={item.categoryId} onClick={()=>handleCategoryClick(item.categoryId)} name={item.categoryName} active={false}>{item.categoryName}</Menu.Item>
                            {/* <div class="image">
                                <img src={'data:image/jpeg;base64,' + item.categoryImage}
                                    style={{ width: '200px', height: '150px' }} />
                            </div> */}
                        </>
                    ))
                }
            </Menu>
        </div>
    )
}

export default Category;