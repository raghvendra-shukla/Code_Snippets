import React from 'react'
import { useEffect,useState } from 'react';

function Card({data}) {
    const [outputs, setOutputs] = useState([]);

        const executeCode = async (code, language, stdin) => {
            try {

                // Request payload for Judge0 API
                const payload = {
                    code: code,
                    language: language,
                    stdin: stdin
                };

                // Send request to backend API
                const response = await fetch('http://localhost:5000/execute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                // Check if request was successful
                if (!response.ok) {
                    throw new Error('Error executing code: ' + response.statusText);
                }

                // Parse response data
                const responseData = await response.json();
                const output = responseData.output;

                return output;
            } catch (error) {
                console.error('Error executing code:', error);
                throw new Error('Internal server error');
            }
        };

        const executeCodeSnippets = async () => {
            try {
                const outputPromises = data.map(async (snippet) => {
                    const code = btoa(snippet.source_code);
                    const stdin = btoa(snippet.stdin);
                    // console.log(code);
                    console.log(stdin);
                    return executeCode(code, snippet.language,stdin);
                });

                const outputs = await Promise.all(outputPromises);
                setOutputs(outputs);
            } catch (error) {
                console.error('Error executing code snippets:', error);
            }
        };
    useEffect(() => {
      executeCodeSnippets();
    }, []);
    
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Code Language
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stdin
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Source Code
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Output
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((entry) => (
            <tr key={entry.id}>
              <td className="px-6 py-4 whitespace-nowrap">{entry.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.language}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.stdin}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.created_at}</td>
              <td className="px-6 py-4 whitespace-nowrap">{entry.source_code.substring(0, 100)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{outputs[entry.submissionId]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Card