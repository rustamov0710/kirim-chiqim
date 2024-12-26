import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import TransactionItem from '../../components/TransactionItem/TransactionItem'
import { API } from '../../utils/config'
import { toast } from 'react-toastify'

const Expanses = () => {
  const loader = useLoaderData()
  const [expansesValue, setExpansesValue] = useState({
    title: '',
    amount: '',
    description: '',
    date: '',
    category: ''
  })

  const [loading, setLoading] = useState(false)

  const onChange = (evt) => {
    setExpansesValue({ ...expansesValue, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setLoading(true)

    try {
      const response = await API.post('add-expense', {
        title: expansesValue.title,
        amount: parseInt(expansesValue.amount),
        description: expansesValue.description,
        date: expansesValue.date,
        category: expansesValue.category,
      })

      toast.success('Expense added successfully')
      setExpansesValue({ title: '', amount: '', description: '', date: '', category: '' })
    } catch (err) {
      toast.error('Error adding expense')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-3">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Expenses</h2>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
        <div>
          <input
            name="title"
            type="text"
            onChange={onChange}
            value={expansesValue.title}
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="amount"
            type="number"
            onChange={onChange}
            value={expansesValue.amount}
            placeholder="Amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="category"
            type="text"
            onChange={onChange}
            value={expansesValue.category}
            placeholder="Category"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="description"
            type="text"
            onChange={onChange}
            value={expansesValue.description}
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            name="date"
            type="date"
            onChange={onChange}
            value={expansesValue.date}
            placeholder="Date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </div>
      </form>

      <ul className="mt-6 px-5">
        {loader?.map((element) => (
          <TransactionItem key={element._id} {...element} />
        ))}
      </ul>
    </div>
  )
}

export default Expanses
