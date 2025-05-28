"use client"
import React, { useEffect, useState } from 'react';
import { Activity, Shield, Users, AlertTriangle, TrendingUp, Clock, Database, Eye, Brain } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [modelStats, setModelStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8082/admin/metrics').then(res => res.json()),
      fetch('http://localhost:8082/admin/detection-stats').then(res => res.json())
    ])
      .then(([metricsData, detectionData]) => {
        setData(metricsData);
        setModelStats(detectionData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Unable to load metrics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Rate Limit Dashboard</h1>
              <p className="text-slate-600 mt-1">Real-time API monitoring and security metrics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total IPs"
            value={Object.keys(data.rate_by_ip || {}).length}
            icon={<Users className="h-5 w-5" />}
            color="blue"
          />
          <StatCard
            title="API Keys"
            value={Object.keys(data.rate_by_key || {}).length}
            icon={<Database className="h-5 w-5" />}
            color="green"
          />
          <StatCard
            title="Reputation Tracked"
            value={Object.keys(data.reputation_scores || {}).length}
            icon={<TrendingUp className="h-5 w-5" />}
            color="purple"
          />
          <StatCard
            title="Blocked Requests"
            value={Object.keys(data.blocked_requests || {}).length}
            icon={<AlertTriangle className="h-5 w-5" />}
            color="red"
          />
          <StatCard
            title="Model Blocked"
            value={modelStats?.blocked_count || 0}
            icon={<Brain className="h-5 w-5" />}
            color="indigo"
          />
        </div>

        {/* Metrics Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MetricsSection 
            title="Rate by IP Address" 
            data={data.rate_by_ip} 
            icon={<Activity className="h-5 w-5" />}
            color="blue"
            description="Request rates grouped by client IP addresses"
          />
          <MetricsSection 
            title="Rate by API Key" 
            data={data.rate_by_key} 
            icon={<Database className="h-5 w-5" />}
            color="green"
            description="Request rates grouped by API authentication keys"
          />
          <MetricsSection 
            title="Reputation Scores" 
            data={data.reputation_scores} 
            icon={<TrendingUp className="h-5 w-5" />}
            color="purple"
            description="Trust scores calculated for various clients"
          />
          <MetricsSection 
            title="Blocked Requests" 
            data={data.blocked_requests} 
            icon={<AlertTriangle className="h-5 w-5" />}
            color="red"
            description="Requests that were denied due to rate limiting"
          />
          <MetricsSection 
            title="Model Detection" 
            data={modelStats?.blocked_clients?.reduce((acc, client) => ({ ...acc, [client]: 'Blocked' }), {}) || {}} 
            icon={<Brain className="h-5 w-5" />}
            color="indigo"
            description={`Anomaly detection using ${modelStats?.detection_algorithm || 'unknown'} algorithm`}
          />
          <MetricsSection
            title="Model Training Statistics"
            data={data.model_training_stats}
            icon={<Clock className="h-5 w-5" />}
            color="blue"
            description="Statistics about the anomaly detection model training"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200'
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`p-3 rounded-xl border ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function MetricsSection({ title, data, icon, color, description }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600',
    indigo: 'from-indigo-500 to-indigo-600'
  };

  const entries = Object.entries(data || {});
  const isEmpty = entries.length === 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colorClasses[color]} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {icon}
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-white/80 text-sm mt-1">{description}</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Eye className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6">
          {isEmpty ? (
            <div className="text-center py-8">
              <div className="text-slate-400 text-sm">No data available</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Identifier</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map(([key, value], index) => (
                    <tr 
                      key={key} 
                      className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                        index === entries.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="font-mono text-sm text-slate-700 bg-slate-100 px-3 py-1 rounded-md inline-block">
                          {key}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-semibold text-slate-900">
                          {typeof value === 'number' ? value.toLocaleString() : value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}