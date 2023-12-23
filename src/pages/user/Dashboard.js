import Sidebar from '../../components/nav/Sidebar';

export default function Dashboard() {
    return (
        <div className="container-fluid default-top-margin">
            <Sidebar />
            <div className="container mt-2">
                <h2>User Dashboard</h2>
            </div>
        </div>
    );
}
