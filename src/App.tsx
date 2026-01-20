import { useState } from 'react';
import { Delete, Calculator } from 'lucide-react';

type Operator = '+' | '-' | '*' | '/' | null;

function App() {
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setCurrentValue(num);
      setWaitingForNewValue(false);
    } else {
      setCurrentValue(currentValue === '0' ? num : currentValue + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setCurrentValue('0.');
      setWaitingForNewValue(false);
      return;
    }
    if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  const handleOperator = (op: Operator) => {
    if (previousValue && operator && !waitingForNewValue) {
      const result = calculate(parseFloat(previousValue), parseFloat(currentValue), operator);
      setCurrentValue(String(result));
      setPreviousValue(String(result));
    } else {
      setPreviousValue(currentValue);
    }
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const calculate = (a: number, b: number, op: Operator): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEqual = () => {
    if (operator && previousValue) {
      const result = calculate(parseFloat(previousValue), parseFloat(currentValue), operator);
      setCurrentValue(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleDelete = () => {
    if (waitingForNewValue) return;
    setCurrentValue(currentValue.length > 1 ? currentValue.slice(0, -1) : '0');
  };

  const handlePercent = () => {
    const val = parseFloat(currentValue);
    setCurrentValue(String(val / 100));
  };

  const handleToggleSign = () => {
    const val = parseFloat(currentValue);
    setCurrentValue(String(val * -1));
  };

  const Button = ({ 
    text, 
    onClick, 
    variant = 'default', 
    className = '' 
  }: { 
    text: string | React.ReactNode, 
    onClick: () => void, 
    variant?: 'default' | 'operator' | 'action', 
    className?: string 
  }) => {
    const baseStyles = "h-16 w-16 rounded-2xl text-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center shadow-lg";
    const variants = {
      default: "bg-slate-700 hover:bg-slate-600 text-white",
      operator: "bg-orange-500 hover:bg-orange-400 text-white shadow-orange-500/20",
      action: "bg-slate-500 hover:bg-slate-400 text-slate-100"
    };

    return (
      <button 
        onClick={onClick} 
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-[360px] bg-slate-800/50 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 text-slate-400">
          <Calculator size={20} />
          <span className="text-sm font-medium tracking-wide">REACT CALC</span>
        </div>

        {/* Display */}
        <div className="mb-6 text-right space-y-2">
          <div className="h-6 text-slate-400 text-sm font-mono overflow-hidden">
            {previousValue} {operator}
          </div>
          <div className="text-5xl font-light tracking-tight text-white overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
            {currentValue}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          <Button text="AC" onClick={handleClear} variant="action" />
          <Button text="+/-" onClick={handleToggleSign} variant="action" />
          <Button text="%" onClick={handlePercent} variant="action" />
          <Button text="÷" onClick={() => handleOperator('/')} variant="operator" />

          <Button text="7" onClick={() => handleNumber('7')} />
          <Button text="8" onClick={() => handleNumber('8')} />
          <Button text="9" onClick={() => handleNumber('9')} />
          <Button text="×" onClick={() => handleOperator('*')} variant="operator" />

          <Button text="4" onClick={() => handleNumber('4')} />
          <Button text="5" onClick={() => handleNumber('5')} />
          <Button text="6" onClick={() => handleNumber('6')} />
          <Button text="-" onClick={() => handleOperator('-')} variant="operator" />

          <Button text="1" onClick={() => handleNumber('1')} />
          <Button text="2" onClick={() => handleNumber('2')} />
          <Button text="3" onClick={() => handleNumber('3')} />
          <Button text="+" onClick={() => handleOperator('+')} variant="operator" />

          <Button text={<Delete size={20} />} onClick={handleDelete} />
          <Button text="0" onClick={() => handleNumber('0')} />
          <Button text="." onClick={handleDecimal} />
          <Button text="=" onClick={handleEqual} variant="operator" />
        </div>
      </div>
    </div>
  );
}

export default App;