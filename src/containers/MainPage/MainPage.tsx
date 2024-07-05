import {useParams} from 'react-router-dom';
import {PAGES} from '../../constants';
import {useCallback, useEffect, useState} from 'react';
import {ApiPage} from '../../types';
import axiosApi from '../../axiosApi';
import Page from '../../components/Page/Page';

const MainPage = () => {
  const {pageId} = useParams();
  const [page, setPage] = useState<ApiPage>({
    title: '',
    content: '',
  });

  const [loading, setLoading] = useState(false);

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const {data: page} = await axiosApi.get<ApiPage | null>(`/pages/${pageId}.json`);
      if (page == null) {
        setPage({
          title: '',
          content: ''
        });
      } else {
        setPage(page);
      }
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    void fetchPages();
  }, [fetchPages, pageId]);

  let pageTitle = 'This is a main page.';

  if (pageId !== undefined) {
    const currentPage = PAGES.find((page) => page.id === pageId);
    if (currentPage) {
      pageTitle = currentPage.name;
    } else {
      pageTitle = 'Not found page';
    }
  }

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-5 mt-5">{pageTitle}</h4>
      {pageId === undefined ?
        (<p className="text-center text-secondary fs-3">Choose the page from toolbar.</p>)
        :
        (<Page content={page.content} contentLoading={loading}/>)
      }
    </div>
  );
};

export default MainPage;