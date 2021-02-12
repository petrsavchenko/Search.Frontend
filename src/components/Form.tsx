import { useCallback, useState } from "react";

export interface IForm {
    onSubmit: (keywords: string, url: string) => void;
}

export const Form: React.FC<IForm> = ({ onSubmit }) => {

    const [keywords, setKeywords] = useState('');
    const [url, setUrl] = useState('');

    const onChangeKeywords = useCallback(e => {
        setKeywords(e.currentTarget.value);
    }, []);

    const onChangeUrl = useCallback(e => {
        setUrl(e.currentTarget.value);
    }, []);

    const submitHandler = (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit(keywords, url);
    }

    return (
        <form className='form' onSubmit={submitHandler}>
            <label htmlFor="keywords">Enter your keywords:</label>
            <input id="keywords" type="text" value={keywords} onChange={onChangeKeywords} />
            <label htmlFor="url">Enter the url:</label>
            <input id= 'url' type="url" value={url} onChange={onChangeUrl}/>
            <input type="submit" value="Search" disabled={!keywords || !url}/>
        </form>
    );
};
