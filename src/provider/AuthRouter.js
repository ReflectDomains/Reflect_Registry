import { useEffect } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import routes from "../config/routes";

const AuthRouter = ({ children }) => {
  const { address } = useAccount();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const matches = matchRoutes(routes, location);

    const needConnected = matches?.some((item) => {
      const route = item.route;

      // none filed ,return false
      if (!route.needConnected) return false;
      // return need connected
      return route.needConnected;
    });

    if (needConnected && !address) {
      alert("Please connected wallet");
      navigate("/");
    }
    // eslint-disable-next-line
  }, [location.pathname, address]);

  return children;
};

export default AuthRouter;
