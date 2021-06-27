import './Search.css';
import searchIcon from './search.svg';
import { useState } from 'react';
import { getDirectory } from '../features/root/rootSlice';
import { useDispatch, useSelector } from 'react-redux'
import folderImage from '../list/folder.png';
import fileImage from '../list/file.png';
import { detailHandler } from '../list/List';
import { goto } from '../features/navigate/navigateSlice';

export default function Search() {
    const [val, setVal] = useState("");
    return (
        <div className="search-wrapper">
            <img src={searchIcon} alt="Search" />
            <input type="text" placeholder="Search for anything." val={val} onChange={e => setVal(e.target.value)} />
            {val !== "" && <SearchResult search={val} reset={() => setVal("")} />}
        </div>
    );
}

function SearchResult({ search, reset }) {
    const location = useSelector(state => state.navigate.location);
    const dispatch = useDispatch();
    const { files, folders } = useSelector(state => getDirectory(state.root, location));
    const matchedFiles = Object.values(files).filter(({ name }) => name.indexOf(search) > -1);
    const matchedFolders = Object.values(folders).filter(({ name }) => name.indexOf(search) > -1);
    function clickHandler(event, payload) {
        const { type, name } = payload;
        reset();
        switch (type) {
            case 'folder':
                dispatch(goto({
                    location: `${location}/${name}`
                }));
                break;
            case 'file':
                detailHandler(payload);
                break;
            default:
                break;
        }
    }
    return (
        <div className="search-result">
            {
                matchedFolders.map((mFolder, i) => <ResultItem key={`res-folder-${i}`} type="folder" info={mFolder} clickHandler={clickHandler} />)
            }
            {
                matchedFiles.map((mFile, i) => <ResultItem key={`res-file-${i}`} type="file" info={mFile} clickHandler={clickHandler} />)
            }
        </div>
    );
}



function ResultItem({ type, info, clickHandler }) {
    const { name } = info;
    const logo = type === "folder" ? folderImage : fileImage;
    return (
        <div className={`res-item-template ${type}`} onClick={e => clickHandler.call(null, e, { type, ...info })}>
            <div className="icon">
                <img src={logo} alt={name}></img>
            </div>
            <div className="title">
                {name}
            </div>
        </div>
    );
}