import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import Chart from "../Chart/Chart";
import axios from "axios";
import { BsCurrencyDollar } from "react-icons/bs";
import { useGlobalContext } from "../../context/globalContext";

function Dashboard() {
  // const [incomes, setIncomes] = useState([]);
  // const [expenses, setExpenses] = useState([]);
  const {
    incomes,
    expenses,
    totalExpenses,
    totalIncome,
    getIncomes,
    getExpenses,
    totalBalance,
  } = useGlobalContext();
  // const { totalExpenses, totalIncome, getIncomes, getExpenses } = {
  //   getIncomes: async () => {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}get-incomes`
  //     );
  //     setIncomes(response.data);
  //     console.log(response.data);
  //   },

  //   totalIncome: () => {
  //     let totalIncome = 0;
  //     incomes.forEach((income) => {
  //       totalIncome = totalIncome + income.amount;
  //     });

  //     return totalIncome;
  //   },

  //   getExpenses: async () => {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}get-expenses`
  //     );
  //     setExpenses(response.data);
  //     console.log(response.data);
  //   },

  //   totalExpenses: () => {
  //     let totalIncome = 0;
  //     expenses.forEach((income) => {
  //       totalIncome = totalIncome + income.amount;
  //     });

  //     return totalIncome;
  //   },

  //   totalBalance: () => {
  //     return totalIncome() - totalExpenses();
  //   },
  // };

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  <BsCurrencyDollar /> {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  <BsCurrencyDollar /> {totalExpenses()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span>Max
            </h2>
            <div className="salary-item">
              <p>${Math.min(...incomes.map((item) => item.amount))}</p>
              <p>${Math.max(...incomes.map((item) => item.amount))}</p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>${Math.min(...expenses.map((item) => item.amount))}</p>
              <p>${Math.max(...expenses.map((item) => item.amount))}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #915f6d;
    font-weight: 700;
  }

  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con {
      grid-column: 1 / 4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense {
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4.5rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #f0ead6;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
