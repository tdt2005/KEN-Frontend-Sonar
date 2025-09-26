import React from "react";
import "../styles/projects.css";

const Projects: React.FC = () => {
  // Sample issues data
  const issues = [
    { id: "ECP-2", title: "Fix checkout page bug", status: "To Do", assignee: "https://via.placeholder.com/30", comments: 0 },
    { id: "ECP-1", title: "Implement user authentication", status: "In Progress", assignee: "https://via.placeholder.com/30", comments: 1 },
    { id: "ECP-3", title: "Design product catalog UI", status: "Review", assignee: "https://via.placeholder.com/30", comments: 1 },
    { id: "ECP-4", title: "Optimize database queries", status: "Done", assignee: "https://via.placeholder.com/30", comments: 2 },
  ];

  return (
    <div className="kanban-board">
      <div className="column">
        <h3>To Do <span className="count">1</span></h3>
        {issues.filter(issue => issue.status === "To Do").map(issue => (
          <div key={issue.id} className="issue-card">
            <div className="issue-header">
              <span className="issue-id">{issue.id}</span>
              <span className="priority">🔴</span>
            </div>
            <p>{issue.title}</p>
            <div className="issue-footer">
              <img src={issue.assignee} alt="Assignee" className="assignee-img" />
              {issue.comments > 0 && <span className="comment-count">{issue.comments}</span>}
            </div>
          </div>
        ))}
        <button className="create-issue-btn">+ Create issue</button>
      </div>

      <div className="column">
        <h3>In Progress <span className="count">1</span></h3>
        {issues.filter(issue => issue.status === "In Progress").map(issue => (
          <div key={issue.id} className="issue-card">
            <div className="issue-header">
              <span className="issue-id">{issue.id}</span>
              <span className="priority">✔️</span>
            </div>
            <p>{issue.title}</p>
            <div className="issue-footer">
              <img src={issue.assignee} alt="Assignee" className="assignee-img" />
              {issue.comments > 0 && <span className="comment-count">{issue.comments}</span>}
            </div>
          </div>
        ))}
        <button className="create-issue-btn">+ Create issue</button>
      </div>

      <div className="column">
        <h3>Review <span className="count">1</span></h3>
        {issues.filter(issue => issue.status === "Review").map(issue => (
          <div key={issue.id} className="issue-card">
            <div className="issue-header">
              <span className="issue-id">{issue.id}</span>
              <span className="priority">⚠️</span>
            </div>
            <p>{issue.title}</p>
            <div className="issue-footer">
              <img src={issue.assignee} alt="Assignee" className="assignee-img" />
              {issue.comments > 0 && <span className="comment-count">{issue.comments}</span>}
            </div>
          </div>
        ))}
        <button className="create-issue-btn">+ Create issue</button>
      </div>

      <div className="column">
        <h3>Done <span className="count">1</span></h3>
        {issues.filter(issue => issue.status === "Done").map(issue => (
          <div key={issue.id} className="issue-card">
            <div className="issue-header">
              <span className="issue-id">{issue.id}</span>
              <span className="priority">✅</span>
            </div>
            <p>{issue.title}</p>
            <div className="issue-footer">
              <img src={issue.assignee} alt="Assignee" className="assignee-img" />
              {issue.comments > 0 && <span className="comment-count">{issue.comments}</span>}
            </div>
          </div>
        ))}
        <button className="create-issue-btn">+ Create issue</button>
      </div>
    </div>
  );
};

export default Projects;