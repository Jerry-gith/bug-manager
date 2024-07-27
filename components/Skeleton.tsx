import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = ({
  width,
  count,
}: {
  width?: string;
  count?: number;
}) => {
  return <Skeleton />;
};

export default LoadingSkeleton;
