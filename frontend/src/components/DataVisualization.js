import React, { useState, useEffect } from 'react';
import '../assets/DataVisualization.css';

function DataVisualization({ iteration }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchRandomImage = async () => {
            try {
                const response = await fetch(`http://localhost:3000/random-image?iteration=${iteration}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setImageUrl(response.url);
            } catch (error) {
                console.error("Error fetching random image:", error);
            }
        };

        fetchRandomImage();
    }, [iteration]); // The effect runs whenever the iteration prop changes

    return (
        <div className="data-visualization">
            <h2>Data Visualization Graph</h2>
            {imageUrl && <img src={imageUrl} alt={`Data Visualization for iteration ${iteration}`} />}
        </div>
    );
}

export default DataVisualization;
