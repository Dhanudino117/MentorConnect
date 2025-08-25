import React, { useState, useEffect } from 'react';

const ConnectionTest = () => {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testBackendConnection = async () => {
    setLoading(true);
    setBackendStatus('Testing...');
    
    try {
      // Test basic connection
      const response = await fetch('http://localhost:5000/');
      if (response.ok) {
        const data = await response.json();
        setTestResults(prev => ({ ...prev, basic: { success: true, data } }));
        setBackendStatus('✅ Connected');
      } else {
        setTestResults(prev => ({ ...prev, basic: { success: false, error: response.statusText } }));
        setBackendStatus('❌ Connection Failed');
      }
    } catch (error) {
      setTestResults(prev => ({ ...prev, basic: { success: false, error: error.message } }));
      setBackendStatus('❌ Connection Failed');
    }

    // Test health endpoint
    try {
      const healthResponse = await fetch('http://localhost:5000/health');
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        setTestResults(prev => ({ ...prev, health: { success: true, data: healthData } }));
      } else {
        setTestResults(prev => ({ ...prev, health: { success: false, error: healthResponse.statusText } }));
      }
    } catch (error) {
      setTestResults(prev => ({ ...prev, health: { success: false, error: error.message } }));
    }

    setLoading(false);
  };

  useEffect(() => {
    testBackendConnection();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">🔗 Backend Connection Test</h2>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">Status:</span>
          <span className={`px-2 py-1 rounded text-sm ${
            backendStatus.includes('✅') ? 'bg-green-100 text-green-800' : 
            backendStatus.includes('❌') ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'
          }`}>
            {backendStatus}
          </span>
        </div>
        
        <button 
          onClick={testBackendConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>
      </div>

      <div className="space-y-4">
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Basic Connection Test</h3>
          {testResults.basic ? (
            <div className={testResults.basic.success ? 'text-green-600' : 'text-red-600'}>
              {testResults.basic.success ? (
                <div>
                  <p>✅ Successfully connected to backend</p>
                  <pre className="mt-2 text-sm bg-gray-100 p-2 rounded">
                    {JSON.stringify(testResults.basic.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <p>❌ Failed: {testResults.basic.error}</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Not tested yet</p>
          )}
        </div>

        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Health Check</h3>
          {testResults.health ? (
            <div className={testResults.health.success ? 'text-green-600' : 'text-red-600'}>
              {testResults.health.success ? (
                <div>
                  <p>✅ Health check passed</p>
                  <pre className="mt-2 text-sm bg-gray-100 p-2 rounded">
                    {JSON.stringify(testResults.health.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <p>❌ Failed: {testResults.health.error}</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Not tested yet</p>
          )}
        </div>

        <div className="border rounded p-4 bg-blue-50">
          <h3 className="font-semibold mb-2">Connection Details</h3>
          <div className="text-sm space-y-1">
            <p><strong>Backend URL:</strong> http://localhost:5000</p>
            <p><strong>API Base:</strong> http://localhost:5000/api</p>
            <p><strong>Frontend API Calls:</strong> Configured to use http://localhost:5000/api</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTest;
