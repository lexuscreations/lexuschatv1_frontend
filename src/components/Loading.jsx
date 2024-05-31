import { useSelector } from "react-redux";

const Loading = ({ loading = false }) => {
  const globalLoading = useSelector(({ ui }) => ui?.globalLoading);

  return (
    (loading || globalLoading) && (
      <div className="w-full grid place-items-center h-full absolute bg-gray-400 bg-clip-padding z-10 backdrop-filter backdrop-blur-lg bg-opacity-0">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    )
  );
};

export default Loading;
