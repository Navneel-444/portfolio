'use client';
import './ShowMoreButton.scss';
import { analytics } from '@/app/firebase/firebase';
import { logEvent } from 'firebase/analytics';

export default function ShowMoreButton() {
    const handleClick = () => {
        if (analytics) {
            logEvent(analytics, 'click_show_more_projects');
        }
    };

    return (
        <button className="show-more--disabled" onClick={handleClick}>
            <img
                className='show-more__icon'
                src='/icons/show-more.svg'
                width={18}
                height={18}
                alt='button icon to show more projects'
            />
        </button>
    )

}