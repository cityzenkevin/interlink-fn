import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import Card from "../../components/Card";
import { fetchApiData } from "../../redux/features";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Income  vs Budget",
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: 400,
      },
    },
  },
};

export default function FmDashboard() {
  const dispatch = useAppDispatch();
  const d = useAppSelector((state) => state.api);

  let totalIncome = 0;
  let totalExpense = 0;

  d?.incomes?.forEach((income: any) => {
    totalIncome += income.amount;
  });
  d?.expenses?.forEach((exp: any) => {
    totalExpense += exp.amount;
  });

  const groupIncomeByMonth = d?.incomes?.reduce((r: any, a: any) => {
    r[labels[new Date(a.income_date).getMonth()]] = [
      ...(r[new Date(a.income_date).getMonth()] || []),
      a,
    ];
    return r;
  }, {});

  const groupedExpenseByMonth = d?.expenses?.reduce((r: any, a: any) => {
    r[labels[new Date(a.expense_date).getMonth()]] = [
      ...(r[new Date(a.expense_date).getMonth()] || []),
      a,
    ];
    return r;
  }, {});

  const monthlyIncomeTotals = labels.map((label) =>
    groupIncomeByMonth?.[label]?.reduce(
      (total: number, income: any) => total + income.amount,
      0
    )
  );

  const monthlyBudgetTotals = labels.map((label) =>
    groupedExpenseByMonth?.[label]?.reduce(
      (total: number, expense: any) => total + expense.amount,
      0
    )
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: monthlyIncomeTotals,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Expense",
        data: monthlyBudgetTotals,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const data = [
    {
      title: "Income",
      subtitle: `${totalIncome ?? 0} $`,
      description: "Total income Amount",
    },
    {
      title: "Expenses",
      subtitle: `${totalExpense ?? 0} $`,
      description: "Total Expenses",
    },
    {
      title: "Donors",
      subtitle: `${d?.donor?.length ?? 0}`,
      description: "Number of Donors",
    },
    {
      title: "Balance",
      subtitle: `${totalIncome - totalExpense} $`,
      description: "Total Balance",
    },
  ];

  useEffect(() => {
    dispatch(fetchApiData("/finance/incomes"));
    dispatch(fetchApiData("/finance/expenses"));
    dispatch(fetchApiData("/users/donor"));
  }, []);

  return (
    <div className="ml-6  md:ml-60 mt-12 flex flex-col flex-wrap">
      <div className="font-semibold text-xl ml-4 text-primary">
        Financial Manager Dashboard
      </div>
      <div className="flex ">
        {data.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              customClass="md:ml-4 mr-2 md:mr-0 border  md:max-w-[20rem] md:min-w-[15rem] "
            />
          );
        })}
      </div>
      <div className="w-[50%] md:w-[60%] ml-4 mt-2 bg-white border shadow-sm p-3">
        <div>
          <div className="font-semibold text-xl flex-col ml-4 text-primary">
            Income vs Expense
          </div>
        </div>
        <Bar options={options} data={chartData} />
      </div>{" "}
    </div>
  );
}
