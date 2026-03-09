import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { SchoolsTable } from './SchoolsTable';
import { api } from 'src/lib/api-client';
import { useState, useEffect } from 'react';

const BCrumb = [
  {
    to: '/',
    title: 'Home'
  },
  {
    title: 'Schools'
  }];


const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchSchools = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/master/schools/?is_active=true');
      if (response && response.schools) {
        setSchools(response.schools);
      }
    } catch (error) {
      console.error("Failed to fetch schools:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <>
      <BreadcrumbComp title="Schools Management" items={BCrumb} />
      <div className="flex gap-6 flex-col">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading schools...</div>
        ) : (
          <SchoolsTable data={schools} refreshData={fetchSchools} />
        )}
      </div>
    </>
  );
};

export default Schools;