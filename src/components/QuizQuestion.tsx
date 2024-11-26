interface QuizQuestionProps {
  id: number;
  text: string;
  className?: string;
  onClick: () => void;
}

export default function QuizQuestion({
  id,
  text,
  className,
  onClick,
}: QuizQuestionProps) {
  return (
    <div
      key={id}
      onClick={onClick}
      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-300 ${className}`}
    >
      <div>{text}</div>
    </div>
  );
}
