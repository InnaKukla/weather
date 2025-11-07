import { ClipLoader } from "react-spinners";


const Loader = () => {
  return (
    <div className="flex items-center justify-center mt-[30%]">
      <ClipLoader color="#3f5954" loading={true} size={50} />
    </div>
  );
};

export default Loader;
