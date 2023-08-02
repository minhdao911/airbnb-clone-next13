import { FunctionComponent } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface LoaderProps {
  size?: number;
}

const Loader: FunctionComponent<LoaderProps> = ({ size = 24 }) => {
  return <BiLoaderAlt className="animate-spin" size={size} />;
};

export default Loader;
