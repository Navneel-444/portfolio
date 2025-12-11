import './TimePeriodCard.scss';

export default function TimePeriodCard({ info, position, index, isVisible }) {
    const { company, desc, end, role, start } = info;
    const date = `${start}-${end}`

    return (
        <div
            className={`time-period time-period--${position} ${isVisible ? 'time-period--visible' : ''}`}
            style={{ animationDelay: `${0.5 + index * 0.2}s` }}
        >
            <div className={`time-period__container time-period__container--${position}`}>
                <aside className={position == 'left' ? "time-period__year time-period__year--left" : 'time-period__year'}>
                    <p className="time-period__year-text">{date}</p>
                </aside>
                <section className='time-period__info'>
                    <section className={position == 'left' ? "time-period__heading time-period__heading--left" : 'time-period__heading'}>
                        <h3 className="time-period__job-title">{role}</h3>
                        <p className="time-period__company">{company}</p>
                    </section>
                    <p className="time-period__job-description">{desc}</p>
                </section>
            </div>
        </div>
    )
}