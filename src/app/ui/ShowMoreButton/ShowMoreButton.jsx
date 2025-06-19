import './ShowMoreButton.scss';

export default function ShowMoreButton() {
    return (
        <button className="show-more">
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