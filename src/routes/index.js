import { AppRoutes } from "./app.routes";
import { useGlobal } from "./../contexts/contextApi";

export const Routes = () => {
  const { hasUser } = useGlobal();
  return <><AppRoutes/></>;
};
