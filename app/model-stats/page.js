'use client';
import React, { useEffect, useState } from 'react';

export default function ModelStatsPage() {
  const [detectionData, setDetectionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8082/admin/detection-stats')
      .then(async res => {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          setDetectionData(json);
        } catch (e) {
          console.error("Non-JSON response:", text);
          setError("Invalid JSON response from server");
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to fetch detection stats");
      });
  }, []);

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!detectionData) return <div className="p-4">Loading model stats...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Anomaly Detection Model Stats</h1>
      <div className="mb-4">
        <strong>Algorithm:</strong> {detectionData.detection_algorithm}
      </div>
      <div className="mb-4">
        <strong>Blocked Count:</strong> {detectionData.blocked_count}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Blocked Clients:</h2>
        <ul className="list-disc pl-5">
          {detectionData.blocked_clients.map((client, index) => (
            <li key={index}>{client}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}