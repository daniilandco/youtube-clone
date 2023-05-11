import './Button.css'

const Button = ({ icon, title, onClick, height, width, margin, type, selected }) => {

    if (type === 'category')
        return (
            <button
                className="category-btn"
                onClick={() => onClick()}
                style={{
                    background: selected ? 'red' : '#141414',
                    margin,
                    height,
                    width
                }}>
                <p className="buttonIcon" style={{
                    color: selected ? 'white' : 'red',
                    display: icon ? 'block' : 'none'
                }}
                >
                    {' '}
                    {icon}{' '}
                </p>
                <p className='buttonTitle' style={{
                    opacity: selected ? 1 : 0.5
                }}
                > {title} </p>
            </button>
        )

    return (
        <button
            className="category-btn"
            onClick={() => onClick()}
            style={{
                margin,
                height,
                width: width ? width : 'fit-content'
            }}>
            <p
                className="buttonIcon"
                style={{ display: icon ? 'block' : 'none' }}>
                {' '}
                {icon}{' '}
            </p>
            <p className='buttonTitle'> {title} </p>
        </button >
    )
}

export default Button