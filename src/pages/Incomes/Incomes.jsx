import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import TransactionItem from '../../components/TransactionItem/TransactionItem';
import { API } from '../../utils/config';
import { toast } from 'react-toastify';

const Incomes = () => {
  const loader = useLoaderData(); // API orqali kelayotgan boshlang'ich ma'lumotlar
  const [incomes, setIncomes] = useState(loader || []); // Mahalliy state uchun boshlang'ich qiymat
  const [incomesValue, setIncomesValue] = useState({
    title: '',
    amount: '',
    description: '',
    date: '',
    category: '',
  });

  const [loading, setLoading] = useState(false); // Loading holatini boshqarish

  const onChange = (evt) => {
    setIncomesValue({ ...incomesValue, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const response = await API.post('add-income', {
        title: incomesValue.title,
        amount: parseInt(incomesValue.amount),
        description: incomesValue.description,
        date: incomesValue.date,
        category: incomesValue.category,
      });

      if (response.data) {
        setIncomes([response.data, ...incomes]); // Yangi elementni boshiga qo'shish
      }

      toast.success('Income added successfully');
      setIncomesValue({ title: '', amount: '', description: '', date: '', category: '' }); // Formani tozalash
    } catch (err) {
      toast.error('Error adding income');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setIncomes(incomes.filter((income) => income._id !== id)); // Mahalliy state'dan o'chirish
  };

  return (
    <div className="px-3">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Incomes</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
      >
        <div>
          <input
            name="title"
            type="text"
            onChange={onChange}
            value={incomesValue.title}
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="amount"
            type="number"
            onChange={onChange}
            value={incomesValue.amount}
            placeholder="Amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="category"
            type="text"
            onChange={onChange}
            value={incomesValue.category}
            placeholder="Category"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="description"
            type="text"
            onChange={onChange}
            value={incomesValue.description}
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="date"
            type="date"
            onChange={onChange}
            value={incomesValue.date}
            placeholder="Date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? 'Adding...' : 'Add Income'}
          </button>
        </div>
      </form>

      <ul className="mt-6 px-5">
        {incomes.map((element) => (
          <TransactionItem
            key={element._id}
            {...element}
            onDelete={handleDelete} // Delete funksiyasini uzatish
          />
        ))}
      </ul>
    </div>
  );
};

export default Incomes;
