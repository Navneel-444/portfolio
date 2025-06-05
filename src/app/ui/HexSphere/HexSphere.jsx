import './HexSphere.scss';
import Image from 'next/image';

export default function HexSphere() {
    return (
        <Image
            className='hex-sphere__image'
            src='images/hex-sphere.svg'
            width={336}
            height={341}
            alt='interactive he4xagon sphere'
        />
    )
}