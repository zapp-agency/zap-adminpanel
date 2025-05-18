import React from 'react';

interface NumberFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const NumberField: React.FC<NumberFieldProps> = ({ label, error, id, ...props }) => {
  const inputId = id || `number-field-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label htmlFor={inputId} style={{ display: 'block', marginBottom: 4 }}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="number"
        {...props}
        style={{
          padding: '8px',
          border: error ? '1px solid red' : '1px solid #ccc',
          borderRadius: 4,
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
      {error && <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{error}</div>}
    </div>
  );
};

export default NumberField;
