
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser';

const Filter = () => {
  useUser();
  return (
    <Dashboard activeMenu="Filter">
        This is filter Page
      </Dashboard>
  )
}

export default Filter