import '../../../styles/main.scss';
import BentoSquare from '@/app/ui/BentoSquare/BentoSquare';

export default function ProjectDetails({ project }) {
    const {
        'desc': desc,
        'overview': overview,
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
            <BentoSquare heading='Overview' info={overview} />
        </main>
    );
}
