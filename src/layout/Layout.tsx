import Navigation from "./Navigation";
import { useContext } from 'react';
import AuthContext from "../store/AuthContext";

const Layout = (props: any) => {
  const context = useContext(AuthContext)
  return (
    <>
       <Navigation user={context.auth.email} />
      <div className="mt-5">
        {props.children}
      </div>
    </>
  );
};

export default Layout;
