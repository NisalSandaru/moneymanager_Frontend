import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Model from "../components/Model";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Faild to Fetch income details", error);
      toast.error(error.response?.data?.message || "Failed to fetch details");
    } finally {
      setLoading(false);
    }
  };

  //fetch cat for income
  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income")
      );
      if (response.status === 200) {
        console.log("adad adw ", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch income categories", error);
      toast.error(error.data?.message || "Failed to fetch income categories");
    }
  };

  //save income details
  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

    //validation
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greter than 0");
      return;
    }

    if (!date) {
      toast.error("Please select a Date");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Date cannot be in the future");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (response.status === 201) {
        setOpenAddIncomeModel(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.log("Error adding income", error);
      toast.error(error.response?.data?.message || "Failed to adding income");
    }
  };

  //delete income details
  const deleteIncome = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Error deleting income", error);
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  useUser();
  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with line chart */}
            
            <IncomeOverview transactions={incomeData} onAddIncome={()=>setOpenAddIncomeModel(true)} />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          />

          <Model
            isOpen={openAddIncomeModel}
            onClose={() => setOpenAddIncomeModel(false)}
            title={"Add Income"}
          >
            <AddIncomeForm
              onAddIncome={(income) => handleAddIncome(income)}
              categories={categories}
            />
          </Model>

          {/* delete income model */}
          <Model
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title={"Delete Income"}
          >
            <DeleteAlert
              content="Are you sure want to delete this income details?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Model>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
