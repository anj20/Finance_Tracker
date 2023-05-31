import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import ExpenseForm from "./ExpenseForm";
import axios from "axios";
const BASE_URL = "http://localhost:5001/api/v1/";
function Expenses() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const { addIncome, getExpenses, deleteExpense, totalExpenses } = {
    //calculate incomes
    addIncome: async (income) => {
      const response = await axios
        .post(`${BASE_URL}add-income`, income)
        .catch((err) => {
          setError(err.response.data.message);
        });
    },
    getExpenses: async () => {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
      console.log(response.data);
    },

    deleteExpense: async (id) => {
      const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses();
    },
    totalExpenses: () => {
      let totalIncome = 0;
      expenses.forEach((income) => {
        totalIncome = totalIncome + income.amount;
      });

      return totalIncome;
    },
  };

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">
          Total Expense: <span>${totalExpenses()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              console.log(income);
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Expenses;
