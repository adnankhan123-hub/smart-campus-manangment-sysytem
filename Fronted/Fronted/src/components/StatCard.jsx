
function StatCard({ title, value, description, icon, color }) {
    return (
        <div className={`stat-card ${color}`}>
            <div className="stat-card-content">
                <p>{title}</p>
                <h2>{value}</h2>
                <span>{description}</span>
            </div>

            <div className="stat-card-icon">
                {icon}
            </div>
        </div>
    );
}

export default StatCard;
