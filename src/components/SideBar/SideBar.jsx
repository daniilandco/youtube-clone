import { categories } from '../../utils/consts'
import './SideBar.css'

const SideBar = ({selectedCategory, setSelectedCategory}) => {

    const buttonBackground = (categoryName) => { return {background: (categoryName === selectedCategory) ? 'red' : '#141414' } }
    const iconColor = (categoryName) => { return {color: (categoryName === selectedCategory) ? 'white' : 'red' } }
    const nameOpacity = (categoryName) => { return {opacity: (categoryName === selectedCategory) ? 1 : 0.8 } }


    return (
        <div className='sideBar'>
           {categories.map((category, index) => (
            <button 
            key={index} 
            className='category-btn' 
            onClick={() => setSelectedCategory(category.name)}
            style= {buttonBackground(category.name)} >
                <p 
                className='buttonIcon' 
                style={iconColor(category.name)}> {category.icon} </p>
                <p style={nameOpacity(category.name)} > {category.name} </p>
            </button>
           ))}  
        </div>
    )
}

export default SideBar