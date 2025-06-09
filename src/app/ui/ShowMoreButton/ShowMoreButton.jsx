import Image from 'next/image';
import './ShowMoreButton.scss';

export default function ShowMoreButton() {
    return (
        <button className="show-more">
            <Image
                className='show-more__icon'
                src='/images/show-more-icon.svg'
                width={18}
                height={18}
                alt='button icon to show more projects'
            />
        </button>
    )

}