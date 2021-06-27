import { useDispatch, useSelector, Provider } from 'react-redux'
import './List.css';
import addImage from './add.png'
import folderImage from './folder.png'
import fileImage from './file.png'
import { useCallback, useEffect, useState } from 'react';
import { remove, getDirectory } from '../features/root/rootSlice';
import { goto } from '../features/navigate/navigateSlice';
import { Modal } from '../modal/Modal';
import { render } from 'react-dom';
import Create from '../create/Create';
import { store } from '../app/store';
import FileInfo from '../fileInfo/FileInfo';


export function List() {
    const location = useSelector(state => state.navigate.location);
    const { files, folders } = useSelector(state => getDirectory(state.root, location));
    const dispatch = useDispatch();
    const [pos, setPos] = useState({ left: 0, top: 0 });
    const [showMenu, setShowMenu] = useState(false);
    const [payload, setPayload] = useState({ location, name: null, type: null });
    const handleContextMenu = (e, metaData) => {
        e.preventDefault();
        const { top, left, height, width } = e.target.getBoundingClientRect();
        setPos({ left: left + width, top: top + height });
        setShowMenu(true);
        setPayload(Object.assign({ ...payload }, metaData));
    };
    const actionHandler = (actionType) => {
        const { name, type } = payload;
        switch (actionType) {
            case 'info':
                detailHandler(payload);
                break;
            case 'remove':
                dispatch(remove(payload));
                break;
            case 'navigate':
                if (type === 'folder')
                    dispatch(goto({
                        location: `${location}/${name}`
                    }));
                else {
                    detailHandler(payload);
                }
                break;
            default:
                break;
        }
    }
    const closeContextMenu = useCallback(() => setShowMenu(false), [])
    useEffect(() => {
        if (showMenu) {
            document.addEventListener("click", closeContextMenu);
            document.addEventListener("contextMenu", closeContextMenu);
        } else {
            document.removeEventListener("click", closeContextMenu);
            document.removeEventListener("contextMenu", closeContextMenu);
        }
    }, [showMenu, closeContextMenu])
    return (
        <div className="list">
            {
                Object.values(folders).map((folder, i) => (
                    <div key={`folder-${i}`} className="list-item">
                        <Folder contextMenuHandler={handleContextMenu} info={folder}></Folder>
                    </div>
                ))
            }
            {
                Object.values(files).map((file, i) => (
                    <div key={`file-${i}`} className="list-item">
                        <File contextMenuHandler={handleContextMenu} info={file}></File>
                    </div>
                ))
            }
            <div className="list-item">
                <div className="add-file-folder" onClick={addHandler}>
                    <img src={addImage} alt="Add File/Folder"></img>
                </div>
            </div>
            {showMenu && <ContextMenu {...pos} actionHandler={actionHandler} />}
        </div>
    );
}

function addHandler() {
    render(<Provider store={store}>
        <Modal title="Create New">
            <Create />
        </Modal>
    </Provider>, document.getElementById('modal-root'));
}
export function detailHandler(metaData) {
    render(
        <Modal title="File Info">
            <FileInfo metaData={metaData} />
        </Modal>
        , document.getElementById('modal-root'));
}
function File({ info, contextMenuHandler }) {
    return (
        <ListItemTemplate type="file" info={info} logo={fileImage} contextMenuHandler={contextMenuHandler} />
    );
}
function Folder({ info, contextMenuHandler }) {
    return <ListItemTemplate type="folder" info={info} logo={folderImage} contextMenuHandler={contextMenuHandler} />;
}

function ListItemTemplate({ type, logo, info, contextMenuHandler }) {
    const { name } = info;
    const extension = type === "file" && name.match(/(?<=\.)[a-z]+$/)[0];
    return (
        <div className={`item-template ${type}`} onContextMenu={e => contextMenuHandler.call(null, e, { type, ...info })}>
            <div className="icon">
                <img src={logo} alt={name}></img>
                {
                    extension && <div className="extension">.{extension}</div>
                }
            </div>
            <div className="title">
                {name}
            </div>
        </div>
    );
}

function ContextMenu({ top, left, actionHandler }) {
    return (
        <div className="context-menu" style={{ left, top }}>
            <ul>
                <li onClick={e => { actionHandler('navigate') }}>Open</li>
                <li onClick={e => { actionHandler('info') }}>Get Info</li>
                <li onClick={e => { actionHandler('remove') }}><span style={{ color: 'red' }}>Delete</span></li>
            </ul>
        </div>
    )
}