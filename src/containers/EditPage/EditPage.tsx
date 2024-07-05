import EditPageForm from '../../components/EditPageForm/EditPageForm';
import {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import {ApiPage} from '../../types';
import axiosApi from '../../axiosApi';
import {PAGES} from '../../constants';
import {useNavigate} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const EditPage = () => {
  const [page, setPage] = useState<ApiPage>({
    title: '',
    content: '',
  });
  const [selectedPage, setSelectedPage] = useState('');
  const [isSelected, setIsSelected] = useState(true);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setPage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onPageSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPage(event.target.value);
    setIsSelected(event.target.value === '');
  };

  const fetchPage = useCallback(async () => {
    const {data: page} = await axiosApi.get<ApiPage>(`/pages/${selectedPage}.json`);
    setPage(page);
  }, [selectedPage]);

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const editedPage = {
      title: page.title,
      content: page.content,
    };
    try {
      await axiosApi.put(`/pages/${selectedPage}.json`, editedPage);
    } finally {
      setLoading(false);
      navigate(`/pages/${selectedPage}`);
    }
  };

  useEffect(() => {
    void fetchPage();
  }, [fetchPage, selectedPage]);

  let form = (
    <>
      <div>
        <label htmlFor="pageName" className="col-form-label">Select page</label>
        <select
          className="form-select w-50 mb-3"
          id="pageName"
          name="pageName"
          required
          onChange={onPageSelect}
          value={selectedPage}
        >
          <option value="" disabled>Pages</option>
          {
            PAGES
              .filter(page => page.id !== 'admin')
              .map((page) => (
                <option key={page.id} value={page.id}>{page.name}</option>
              ))
          }
        </select>
      </div>
      <EditPageForm page={page} onFieldChange={onFieldChange} onFormSubmit={onFormSubmit} disabled={isSelected}/>
    </>
  );

  if (loading) {
    form = <Spinner/>;
  }

  return (
    <div className="container mt-3">
      <h4>Edit pages</h4>
      {form}
    </div>
  );
};

export default EditPage;