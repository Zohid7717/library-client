import { useRef, Dispatch, FC, SetStateAction } from 'react';
import { DecoupledEditor, Bold, Essentials, Heading, Italic, Paragraph } from 'ckeditor5'
import { CKEditor } from '@ckeditor/ckeditor5-react';

import 'ckeditor5/ckeditor5.css';
import './CKEditor.scss'
import { useTranslation } from 'react-i18next';

type Props = {
  setText:Dispatch<SetStateAction<string>>
}

const CKEditorEl: FC<Props> = ({setText })=> {
  const editorToolbarRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation()

  return (
    <div className='ck_content'>
      <div ref={editorToolbarRef}></div>
      <div>
        <CKEditor
          editor={DecoupledEditor}
          data={`<p>${t('admin.addBook.Book fragment')}</p>`}
          config={{
            plugins: [Bold, Italic, Paragraph, Essentials, Heading],
            toolbar: ['undo', 'redo', '|', 'bold', 'italic', 'heading']
          }}
          onReady={(editor) => {
            if (editorToolbarRef.current) {
              editorToolbarRef.current?.appendChild(editor.ui.view.toolbar.element);
            }
          }}
          onAfterDestroy={(editor) => {
            if (editorToolbarRef.current) {
              Array.from(editorToolbarRef.current.children).forEach((child) => child.remove());
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            setText(data)
          }}
        />
      </div>
    </div>
  );
}

export default CKEditorEl;
