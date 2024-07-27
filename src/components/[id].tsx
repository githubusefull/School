'use client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AdmissionDetail = ({ initialData }: { initialData: any }) => {
  const [data, setData] = useState(initialData);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (!initialData) {
        try {
          const response = await fetch(`/api/admissionformnote/${id}`);
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [id, initialData]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admission Detail</h1>
      <p>Name: {data.name}</p>
      {/* Render other fields as necessary */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  let initialData = null;

  try {
    const response = await fetch(`http://localhost:3000/api/admissionformnote/${id}`);
    initialData = await response.json();
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }

  return {
    props: { initialData },
  };
};

export default AdmissionDetail;
