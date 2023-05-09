import { Link } from 'react-router-dom'
import { demoProfilePicture } from '../../utils/consts'
import CheckIcon from '../checkIcon/CheckIcon'
import './ChannelCard.css'

const ChannelCard = ({ channel, marginTop }) => {
    return (
        <section className="channelCard" style={{ marginTop: marginTop }}>
            <Link to={`/channel/${channel?.id?.channelId}`}>
                <section className="channelCardContent">
                    <img
                        className="channelImage"
                        src={
                            channel?.snippet?.thumbnails?.medium?.url ||
                            demoProfilePicture
                        }
                        alt={channel?.snippet?.title}
                    />
                    <h3>
                        {channel?.snippet?.title}
                        <CheckIcon />
                    </h3>
                    {channel?.statistics?.subscriberCount && (
                        <h4>
                            {parseInt(
                                channel?.statistics?.subscriberCount
                            ).toLocaleString()}{' '}
                            Subscribers
                        </h4>
                    )}
                </section>
            </Link>
        </section>
    )
}

export default ChannelCard
