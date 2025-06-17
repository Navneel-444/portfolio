import './TimePeriodCard.scss';

export default function TimePeriodCard({ info, position }) {
    const { title, company, date, description } = info;
    return (
        <article className={`time-period time-period--${position}`}>
            <div className={`time-period__container time-period__container--${position}`}>
                <aside className={position == 'left' ? " time-period__year time-period__year--left" : 'time-period__year'}>
                    <p className="time-period__year-text">{date}</p>
                </aside>
                <section className='time-period__info'>
                    <section className={position == 'left' ? " time-period__heading time-period__heading--left" : 'time-period__heading'}>
                        <h3 className="time-period__job-title">{title}</h3>
                        <p className="time-period__company">{company}</p>
                    </section>
                    <p className="time-period__job-description">{description}</p>
                </section>
            </div>
        </article >
    )
}