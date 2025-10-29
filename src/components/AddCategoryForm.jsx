import React, { useState } from 'react'
import Input from './Input'
import EmojiPickerPopup from './EmojiPickerPopup'
import { LoaderCircle } from 'lucide-react'

const AddCategoryForm = ({onAddCategory}) => {
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    })

    const [loading, setLoading] = useState(false);

    const categoryTypeOptions = [
        {value: "income", label: "Income"},
        {value: "expense", label: "Expense"}
    ]

    const handleChange = (key, value)=>{
        setCategory({...category, [key]: value})
    }

    const handleSubmit = async ()=> {
        setLoading(true);
        try {
            await onAddCategory(category);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

  return (
    <div className='p-4'>

        <EmojiPickerPopup 
            icon={category.icon}
            onSelect={(selectedIcon)=> handleChange("icon", selectedIcon)}
        />

        <Input 
        value={category.name}
        onChange={({target})=> handleChange("name", target.value)}
        label={"Category Name"}
        placeholder="e.g., Freelace, Salary, Groceries"
        type="text"
        />

        <Input 
        label={"Category Type"}
        value={category.type}
        onChange={({target})=>handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
        />

        <div className="flex justify-end mt-6">
            <button 
            type='button'
            onClick={handleSubmit}
            disabled={loading}
            className='add-btn-fill cursor-pointer'>
                {loading ? (
                    <>
                    <LoaderCircle className='w-4 h-4 animate-spin' />
                    Adding...
                    </>
                ):(
                    <>
                    Add Category
                    </>
                )}
            </button>
        </div>

    </div>
  )
}

export default AddCategoryForm