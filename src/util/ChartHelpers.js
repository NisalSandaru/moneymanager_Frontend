// Format number with Indian-style thousands separator (1,00,000)
export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const numStr = num.toString();
  const parts = numStr.split(".");
  let integerPart = parts[0];
  const fractionalPart = parts[1];

  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== "") {
    const formattedOtherNumbers = otherNumbers.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    integerPart = formattedOtherNumbers + "," + lastThree;
  } else {
    integerPart = lastThree;
  }

  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};

// Format currency with Rs prefix
export const formatCurrency = (num) => {
  return `Rs ${addThousandsSeparator(num)}`;
};

// Convert date string (YYYY-MM-DD) to something like "22nd Oct"
const formatDateToMonthLabel = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  return `${day}${suffix} ${month}`;
};

// 🧮 Prepare data for line chart — group transactions by date
export const prepareIncomeLineChartData = (transactions = []) => {
  if (!Array.isArray(transactions) || transactions.length === 0) return [];

  // Group transactions by date
  const grouped = transactions.reduce((acc, curr) => {
    const dateKey = curr.date;
    if (!acc[dateKey]) {
      acc[dateKey] = { date: dateKey, totalAmount: 0, items: [] };
    }
    acc[dateKey].totalAmount += Number(curr.amount) || 0;
    acc[dateKey].items.push(curr);
    return acc;
  }, {});

  // Convert to array and add formatted month labels
  const chartData = Object.values(grouped).map((entry) => ({
    ...entry,
    month: formatDateToMonthLabel(entry.date),
  }));

  // Sort by date (ascending)
  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return chartData;
};
