import React from 'react';
import '../styles/dashboard.css'; 

const Dashboard = () => {
    return (
        <div className="streamlit-container">
          <iframe
            src="https://gdp-dashboard-5y8zan904n5.streamlit.app?embedded=true"  // Replace with your actual Streamlit app URL
            className="streamlit-iframe"
            title="Streamlit Data Visualizations"
          />
        </div>
      );
};

export default Dashboard;

