import React, { useContext } from "react";
import mainContext from "../context/context";
import BusIcon from "../assets/icons8-bus-40.png";
import HamburgerIcon from "../assets/icons8-hamburger-40.png";
import MoreIcon from "../assets/icons8-more-40.png";
import PillIcon from "../assets/icons8-pill-40.png";
import SchoolIcon from "../assets/icons8-school-40.png";
import StatisticsBarChart from "../components/BarChart";
import LineChart from "../components/LineChart";

function Statistics({mode}) {
  const ctx = useContext(mainContext);
  const { spending, spentMoneyTimeline } = ctx;

  const types = [];
  const typesAmount = [];

  Object.entries(spending).forEach((val) => {
    types.push(val[0]);
    typesAmount.push(val[1]);
  });

  const dates = [];
  const moneySpent = [];
  Object.entries(spentMoneyTimeline).sort((a,b)=>{
    const one = new Date(a[0]);
    const two = new Date(b[0]);
    return one - two
  }).forEach(([date, money]) => {
    dates.push(date);
    moneySpent.push(money);
  });
  return (
    <div>
      <div className="flex-container flex-1 flex-wrap">
        <div className="card statistics-card">
          <div>
            <p>Food</p>
            <h5>{spending.Food}₹</h5>
          </div>
          <img src={HamburgerIcon} alt="burger" />
        </div>
        <div className="card statistics-card">
          <div>
            <p>Education</p>
            <h5>{spending.Education}₹</h5>
          </div>
          <img src={SchoolIcon} alt="school" />
        </div>
        <div className="card statistics-card">
          <div>
            <p>Medicine</p>
            <h5>{spending.Medicine}₹</h5>
          </div>
          <img src={PillIcon} alt="pill" />
        </div>
        <div className="card statistics-card">
          <div>
            <p>Travelling</p>
            <h5>{spending.Travelling}₹</h5>
          </div>
          <img src={BusIcon} alt="bus" />
        </div>
        <div className="card statistics-card">
          <div>
            <p>Others</p>
            <h5>{spending.Others}₹</h5>
          </div>
          <img src={MoreIcon} alt="more" />
        </div>
      </div>

      <div>
        <div className="card">
          <LineChart dates={dates} moneySpent={moneySpent} mode={mode} />
        </div>
        <div className="card">
          <StatisticsBarChart types={types} typesAmount={typesAmount} mode={mode} />
        </div>
      </div>
    </div>
  );
}

export default Statistics;

/*
average money spent
most money spent

*/