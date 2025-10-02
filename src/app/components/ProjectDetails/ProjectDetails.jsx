import '../../../styles/main.scss';

export default function ProjectDetails({ project }) {
    const {
        desc,
        overview,
        'problem statement': problemStatement,
        'key features': keyFeatures,
        'tech stack': techStack,
        'what i learned ': whatILearned,
        'architecture / system design': architecture,
        'future improvements': futureImprovements,
        name
    } = project;

    return (
        <main>
            <h1>{name}</h1>
            <h2>Descritption</h2>
            <p>{desc}</p>
            <h2>What I learned </h2>
            <p>{whatILearned}</p>
            <h2>Architecture/System Design</h2>
            <p>{architecture}</p>
            <h2>Future Improvments</h2>
            <p>{futureImprovements}</p>
            <h2>Key Features</h2>
            <p>{keyFeatures}</p>
            <h2>Problem Statement</h2>
            <p>{problemStatement}</p>
            <h2>Tech Stack</h2>
            <p>{techStack}</p>
            <h2>Overview</h2>
            <p>{overview}</p>
        </main>
    );
}
