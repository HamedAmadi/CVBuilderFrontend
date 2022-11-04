import "./Home.scss";
import {Fragment} from "react";
import Banner from "../../../assets/banner3.png"
import Button from "../../components/Button/Button";
import {Link} from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Fragment>
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 text-center my-auto">
              <h1 className="fw-bold">
                رزومه ساز آنلاین
              </h1>
              <h1 className="fw-bold">
                با قالب های خلاقانه و متنوع
              </h1>
              <h5 className="mt-4">با رزومه ساز آنلاین سختی ها را آسان کنید</h5>
              <h5>قالب مورد نظر خود را انتخاب کنید</h5>
              <h5 className="mb-4">و یک رزومه کاری حرفه ای و مناسب بسازید</h5>
              <Link to={"/choose-templates"}>
                <Button size={"large"} style={"solid"} borderRadius={"normal"}>ساخت رزومه</Button>
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="banner-img mx-auto">
                <img src={Banner} alt="banner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
