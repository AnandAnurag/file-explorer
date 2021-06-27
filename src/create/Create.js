import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../features/root/rootSlice';
import { getLocation } from '../features/navigate/navigateSlice';
import { ModalContext } from '../modal/Modal';
import { getDirectory } from '../features/root/rootSlice';
import './Create.css';
export default function Create() {
    const { closeBtnRef } = useContext(ModalContext);
    const location = useSelector(getLocation);
    const { files, folders } = useSelector(state => getDirectory(state.root, location));
    const [isFile, setIsFile] = useState(true);
    const [name, setName] = useState("");
    const isValidName = (!isFile && /^\w+$/.test(name)) || /^\w+\.[a-z]+$/.test(name);
    const [creator, setCreator] = useState("");
    const isValidCreator = /^[A-Za-z\s.]+$/.test(creator);
    const [size, setSize] = useState("");
    const isValidSize = !isNaN(parseInt(size));
    const [date, setDate] = useState("");
    const isValidDate = !isNaN(new Date(date).getTime());
    const dispatch = useDispatch();
    const createHandler = () => {
        const type = isFile ? 'file' : 'folder';
        if (((isFile && files[name]) || folders[name]) && !window.confirm(`'${name}' ${type} already exists. Do you want to replace it?`))
            return;
        dispatch(add({
            type,
            name,
            creator,
            size,
            date,
            location
        }));
        closeBtnRef.current.click();
    };

    return (
        <div className="create">
            <div className="fields">
                <button className={"radio-btn " + (isFile ? "" : "inactive")} onClick={() => setIsFile(true)}>File</button>
                <button className={"radio-btn " + (isFile ? "inactive" : "")} onClick={() => setIsFile(false)}>Folder</button>
            </div>
            <div className="fields">
                <input type="text" className={name === "" || isValidName ? "" : "invalid"} placeholder="Name" onChange={e => setName(e.target.value)} value={name}></input>
            </div>
            <div className="fields">
                <input type="text" className={creator === "" || isValidCreator ? "" : "invalid"} placeholder="Creator" onChange={e => setCreator(e.target.value)} value={creator}></input>
            </div>
            <div className="fields">
                <input type="text" className={size === "" || isValidSize ? "" : "invalid"} placeholder="Size" onChange={e => setSize(e.target.value)} value={size}></input>
            </div>
            <div className="fields">
                <input type="text" className={date === "" || isValidDate ? "" : "invalid"} placeholder="Date" onChange={e => setDate(e.target.value)} value={date}></input>
            </div>
            <div className="action">
                <button onClick={createHandler} disabled={!isValidName || !isValidCreator || !isValidSize || !isValidDate}>Create</button>
            </div>
        </div>
    );
}