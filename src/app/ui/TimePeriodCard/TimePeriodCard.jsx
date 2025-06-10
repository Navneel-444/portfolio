import './TimePeriodCard.scss';

export default function TimePeriodCard() {
    return (
        <article className="time-period">
            <aside className="time-period__year">
                <p className="time-period__year-text">2021-2023</p>
            </aside>
            <section className="time-period__info">
                <section className="time-period__heading">
                    <h3 className="time-period__job-title">Operations Supervisor</h3>
                    <p className="time-period__company">Legacy Supply Chain Service</p>
                </section>
                <p className="time-period__job-description">As a supervisor, I led teams, managed daily operations, and ensured efficiency in workflows. I developed problem-solving skills, coordinated tasks, and maintained a productive work environment while balancing team needs and business goals.</p>
            </section>
        </article>
    )
}