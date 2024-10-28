import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client'

const query = gql`
query GetTodosWithUser {
  getTodos {
    id
    todo
    completed
    user {
      id
      firstName
      lastName
      email
    }
  }
}
`;

// Some times External Dummy APIs won't return Accurate data- So it will throw error. After refreshing the page many times when it gets data it will show table with that data.
function App() {
  const { data, loading } = useQuery(query)

  if (loading) return <h1>Loading....</h1>

  return (
    <div className="App bg-gray-300">
      <table className='bg-white border w-full'>
        <thead className=''>
          <th className='w-[10%] border-2 border-yellow-400'>Todo ID</th>
          <th className='w-[30%] border-2 border-yellow-400'>Todo</th>
          <th className='w-[10%] border-2 border-yellow-400'>Completed</th>
          <th className='w-[10%] border-2 border-yellow-400'>User ID</th>
          <th className='w-[20%] border-2 border-yellow-400'>User Name</th>
          <th className='w-[20%] border-2 border-yellow-400'>User Email</th>
        </thead>
        {data.getTodos.map((todo) => {
          return (
            <tbody>
              <tr className='border-yellow-400 border-2'>
                <td className='w-[10%] border-2 border-yellow-400'>{todo.id}</td>
                <td className='w-[30%] border-2 border-yellow-400'>{todo.todo}</td>
                <td className='w-[10%] border-2 border-yellow-400'>{todo.completed}</td>
                <td className='w-[10%] border-2 border-yellow-400'>{todo?.user?.id}</td>
                <td className='w-[20%] border-2 border-yellow-400'>{`${todo?.user?.firstName} ${todo?.user?.lastName}`}</td>
                <td className='w-[20%] border-2 border-yellow-400'>{todo?.user?.email}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  );
}

export default App;
