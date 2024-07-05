import React, {ChangeEvent, FormEvent} from 'react';
import {ApiPage} from '../../types';

interface EditPageFormProps {
  page: ApiPage;
  onFieldChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const EditPageForm: React.FC<EditPageFormProps> = ({page, onFormSubmit, onFieldChange}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="form-control w-50 mb-3"
          onChange={onFieldChange}
          value={page.title}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          required
          className="form-control"
          onChange={onFieldChange}
          value={page.content}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Save
      </button>
    </form>
  );
};

export default EditPageForm;