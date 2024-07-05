import React from 'react';
import Spinner from '../Spinner/Spinner';

interface PageProps {
  contentLoading: boolean;
  content: string;
}

const Page: React.FC<PageProps> = ({contentLoading, content}) => {
  return (
    <div className="container border p-4 rounded-1 border-info-subtle">
      {contentLoading ? <Spinner/> : (
        <p className="m-0">{content}</p>
      )}
    </div>
  );
};

export default Page;