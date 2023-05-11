import { useEffect } from 'react'
import { categories } from '../../utils/consts'
import { Button } from '..'
import './SideBar.css'

const SideBar = ({ selectedCategory, setSelectedCategory }) => {

    return (
        <section className="sideBar">
            {categories.map((category, index) => (
                <Button
                    key={index}
                    onClick={() => setSelectedCategory(category.name)}
                    title={category.name}
                    icon={category.icon}
                    selected={category.name === selectedCategory}
                    type='category'
                    margin='0 0 15px 0'
                />
            ))}
        </section>
    )
}

export default SideBar
