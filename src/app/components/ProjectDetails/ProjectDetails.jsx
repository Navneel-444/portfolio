export default function ProjectDetails({ project }) {
    return (
        <div>
            <h1>{project?.name ?? 'Unnamed project'}</h1>
            <p>{project?.desc ?? 'No description'}</p>
        </div>
    );
}
