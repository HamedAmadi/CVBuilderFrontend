import {Fragment} from "react"
import {Outlet} from "react-router-dom";
import Header from "./Header/Header"


const MainLayout: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  )
}

export default MainLayout
