import { memo } from "react";
import { Link, useParams } from "react-router-dom";

const Children = () => {
  const { id } = useParams();
  console.log("Children");
  return (
    <div>
      Children-{id}
      <Link to={-1}>back</Link>
    </div>
  );
};

export default memo(Children);
