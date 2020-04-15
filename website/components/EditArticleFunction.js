import { useState } from 'react';
import dynamic from 'next/dynamic';
import { complex } from '../utils/sunEditorConfig';
import api from '../utils/api';
import FunctionArticle from '../components/FunctionArticle';
import 'notyf/notyf.min.css'; // for React and Vue
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(
    () => import('suneditor-react'),
    { ssr: false }
);

const EditArticleFunction = (props) => {

    const [htmlContent, setHtmlContent] = useState("");

    const handleEditorChange = (content) => {
        setHtmlContent(content);
    }

    const handleSave = async (content) => {
        let Notyf;
        if (typeof window != 'undefined') {
            Notyf = require('notyf');
        }
        const notyf = new Notyf.Notyf({
            duration: 5000
        });
        try {
            await api.put(`/admin/functions/article/${props.functionInfo.id}`, { article: content }, { headers: { 'Authorization': props.user.token } });
            notyf.success('Sauvegardé!');
        } catch {}
    }

    return (
        <div className="container-fluid">
            <SunEditor setContents={props.functionInfo.article} lang="fr" onChange={handleEditorChange} setOptions={{ buttonList: complex, callBackSave: handleSave }} />
            <FunctionArticle article={htmlContent} />
        </div>
    );
}

export default EditArticleFunction;