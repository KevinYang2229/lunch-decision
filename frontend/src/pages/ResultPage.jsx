import React from 'react';
import ResultDisplay from '../components/ResultDisplay';

function ResultPage({ result }) {
  return (
    <div className="result-page">
      <ResultDisplay result={result} />
    </div>
  );
}

export default ResultPage;
