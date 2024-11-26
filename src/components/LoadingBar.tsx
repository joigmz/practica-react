/**
 * Props for the LoadingBar component.
 */
interface LoadingBarProps {
  /**
   * Current progress value.
   * @remarks
   * This value represents the current progress and should be a number between 0 and `maxProgress`.
   */
  progress: number;

  /**
   * Maximum progress value.
   * @default 100
   * @remarks
   * This value sets the maximum limit for the progress. If not provided, it defaults to 100.
   */
  maxProgress?: number;
}

/**
 * A component that visually represents a loading bar.
 *
 * @param props - The props for the LoadingBar component.
 * @returns A JSX element representing the loading bar.
 */
const LoadingBar: React.FC<LoadingBarProps> = ({
  progress,
  maxProgress = 100,
}) => {
  const normalizedProgress = Math.min(progress, maxProgress);
  const percentage = (normalizedProgress / maxProgress) * 100;

  return (
    <div className="w-full bg-gray-300 h-4 rounded">
      <div
        className="h-4 rounded transition-all duration-500 bg-gradient-to-r from-green-300 to-green-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default LoadingBar;
