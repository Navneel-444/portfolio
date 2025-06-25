import Image from 'next/image';
import './HexSphere.scss';

export default function HexSphere() {
    return (
        <figure className="hex-sphere__container" aria-labelledby="hex-tooltip">
            <button
                className="hex-sphere__info-icon"
                aria-describedby="hex-sphere-tooltip"
                aria-label="Information about hexagon"
            >
                <Image
                    className='hex-sphere__image'
                    src='/icons/info.svg'
                    width={24}
                    height={24}
                    alt='information on the features of the hexagon sphere'
                />
                <small id="hex-tooltip" role="tooltip" className="hex-sphere__tooltip">
                    This 3D hexagon rotates <br />
                    feature 1<br />
                    feature 2 <br />
                </small>
            </button>
            <img
                className='hex-sphere__image'
                src='/hex-sphere.svg'
                width={336}
                height={341}
                alt='interactive hexagon sphere'
            />
        </figure>
    )
}