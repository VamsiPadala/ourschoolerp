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
    // --- STATIC MOCK DATA ---
    const MOCK_SCHOOLS = [
      { id: 1, name: "Greenwood High School", code: "GHS-001", subdomain: "greenwood", email: "admin@greenwood.edu", subscription_tier: "premium", is_active: true },
      { id: 2, name: "St. Xavier's International", code: "SXI-204", subdomain: "stxaviers", email: "contact@stxaviers.com", subscription_tier: "enterprise", is_active: true },
      { id: 3, name: "Little Hearts Preschool", code: "LHP-99", subdomain: "littlehearts", email: "info@lhp.org", subscription_tier: "basic", is_active: true },
    ];
    // ------------------------

    try {
      const response = await api.get('/master/schools/?is_active=true');
      if (response && response.schools) {
        setSchools(response.schools.length > 0 ? response.schools : MOCK_SCHOOLS);
      } else {
        setSchools(MOCK_SCHOOLS);
      }
    } catch (error) {
      console.error("Failed to fetch schools, showing mocks:", error);
      setSchools(MOCK_SCHOOLS);
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