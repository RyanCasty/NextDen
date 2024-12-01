import React from 'react';
import './dashboard.css'; 

const Dashboard = () => {
    return (
        <div className="streamlit-container">
          <iframe
            src="https://nextden.streamlit.app?embedded=true"  
            className="streamlit-iframe"
            title="Streamlit Data Visualizations"
          />
        </div>
      );
};

export default Dashboard;

