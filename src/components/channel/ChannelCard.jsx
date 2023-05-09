import { Link } from 'react-router-dom'
import { checkCircleIcon, demoProfilePicture } from '../../utils/consts'
import './ChannelCard.css'

const ChannelCard = ({ channel, marginTop }) => {
    return (
        <div className="channelCard" style={{ marginTop: marginTop }}>
            <Link to={`/channel/${channel?.id?.channelId}`}>
                <div className="channelCardContent">
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
                        <img
                            className="checkIcon"
                            src={checkCircleIcon}
                            alt="checked"
                        />
                    </h3>
                    {channel?.statistics?.subscriberCount && (
                        <h4>
                            {parseInt(
                                channel?.statistics?.subscriberCount
                            ).toLocaleString()}{' '}
                            Subscribers
                        </h4>
                    )}
                </div>
            </Link>
        </div>
    )
}

export default ChannelCard
