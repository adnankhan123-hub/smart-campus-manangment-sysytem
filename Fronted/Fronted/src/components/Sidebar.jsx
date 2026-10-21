function Sidebar() {
return (
<aside className="sidebar">
<div className="brand">
<div className="brand-icon">SC</div>
<div>
<h2>Smart Campus</h2>
<span>Management System</span>
</div>
</div>

        <p className="menu-label">MAIN MENU</p>

        <nav className="sidebar-nav">
            <a className="nav-link active" href="#dashboard">
                <span>▦</span> Dashboard
            </a>

            <a className="nav-link" href="#students">
                <span>♙</span> Students
            </a>

            <a className="nav-link" href="/">
                <span>＋</span> Add Student
            </a>

            <div className="nav-link disabled">
                <span>▤</span> Courses <small>Soon</small>
            </div>

            <div className="nav-link disabled">
                <span>✓</span> Attendance <small>Soon</small>
            </div>
        </nav>

        <div className="sidebar-footer">
            <div className="admin-avatar">A</div>
            <div className="admin-info">
                <strong>Administrator</strong>
                <span>Campus Portal</span>
            </div>
        </div>
    </aside>
);

}

export default Sidebar;