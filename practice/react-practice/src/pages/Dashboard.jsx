const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome to your dashboard.</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <p>1,250</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p>580</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <p>₹8,75,000</p>
        </div>

        <div style={cardStyle}>
          <h3>Active Users</h3>
          <p>312</p>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  width: "220px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
};

export default Dashboard;