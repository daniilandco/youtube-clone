import { ThreeDots } from 'react-loader-spinner'
import './Loader.css'

const Loader = () => {
    return (
        <section className='loader'>
            <ThreeDots
                height='300'
                width='300'
                color='red'
                ariaLabel='Loading...'
            />
        </section>
    )
}

export default Loader